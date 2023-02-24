import { useEffect, useState } from "react";
import { getCommentsPosts } from "../../../../../helpers/foro/getCommentsPosts";
import { postCommentsPosts } from "../../../../../helpers/foro/postCommentsPosts";
import { putCommentsPosts } from "../../../../../helpers/foro/putCommentsPosts";
import { deleteCommentsPosts } from "../../../../../helpers/foro/deleteCommentsPosts";
import { getLikes } from "../../../../../helpers/foro/getLikes";

//------- USUARIO HELPER ----------
import { useAuth0 } from "@auth0/auth0-react";
//---------------
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

interface editPost {
  content: string;
  id: string;
}

interface searchPost {
  title: string;
}

interface allPost {
  id: string;
  title: string;
  content: string;
  image: string;
  email: string;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  category: string;
}

interface selectedTag {
  [key: string]: boolean;
}

export function useForoHome() {
  const { user } = useAuth0();

  const [allPost, setAllPost] = useState<allPost[]>([]);
  const [allPostRespaldo, setallPostRespaldo] = useState<allPost[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [addLike, setAddLike] = useState<boolean>(false);
  const [addPost, setAddPost] = useState<boolean>(false);
  const [addEdit, setAddEdit] = useState<boolean>(false);
  const [addComment, setAddComment] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editPost, setEditPost] = useState<editPost>({
    content: "",
    id: "",
  });
  const [form, setForm] = useState({
    email: user?.email,
    title: "",
    content: "",
    image: "",
    category:"",
  });
  const [commentary, setCommentary] = useState({
    content: "",
  });
  const [selectedTag, setSelectedTag] = useState<selectedTag>({});
  const [previewTag, setPreviewTag] = useState<selectedTag>({})




  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    getCommentsPosts("posts")
      .then((res) => res.json())
      .then((res) => {
        setAllPost(res);
        setallPostRespaldo(res);
      });
  }, [addLike, addPost, addEdit, addComment]);

  

  const handlerChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentary({
      content: e.target.value,
    });
  };

  const handleTags= (e:any)=>{
    
    setForm({
      ...form,
      category: e.target.id
    })

    if (!selectedTag[e.target.id]) {

      setSelectedTag({
        [e.target.id]:true
      }) 
      
    } else {
      setSelectedTag({})
    }
  }

  const HandlerpreviewTags = (e: any)=> {
    setPreviewTag({
      [e.target.id]: true
    })
  }

  const handlerQuitPreview = ()=> {
    setPreviewTag({})
  }

  const submitComment = (idPost: string, email: string) => {
    if (commentary.content) {
      postCommentsPosts(
        {
          content: commentary.content,
          post: idPost,
          email: email,
        },
        "comments"
      )
        .then((res) => {
          setAddComment(!addComment);
          setCommentary({
            content: "",
          });
        })
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Your comment was published",
          });
        });
    }
  };

  const editHandlerModal = (id: string, content: string) => {
    setEditOpen(!editOpen);
    setEditPost({
      ...editPost,
      id,
      content,
    });
  };

  const likeHandler = (post: string) => {
    getLikes(
      {
        email: user?.email,
        post,
      },
      "posts"
    ).then(() => {
      setAddLike(!addLike);
    });
  };

  const likeCommentHandler = (idComment: string, email: string) => {
    getLikes(
      {
        comment: idComment,
        email: email,
      },
      "comments"
    ).then(() => {
      setAddLike(!addLike);
    });
  };

  const handlerSubmit = () => { // POST a post
    if(!Object.keys(selectedTag).length){
      swalWithBootstrapButtons.fire(
        "Error",
        "You must select a category",
        "error"
      );
    }else if (form.title==='' || form.content==='') {
      swalWithBootstrapButtons.fire(
        "Error",
        "Your post must have a title and description",
        "error"
      );
    } else {
      
    if (user?.email) {
      setForm({
        ...form,
        email: user?.email,
      });
      postCommentsPosts(form, "posts")
        .then(() => {
          setAddPost(!addPost);
          setForm({
            ...form,
            title: "",
            content: "",
            image: "",
          });
        })
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Your post has been published successfully",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El email no es valido!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }}

  const handlerLike = () => { // Like post
    getLikes(
      {
        id: "63c6f11bf46e034dfcbeeae6",
        post: "63d1f32e866456f173d36227",
      },
      "posts"
    )
      .then((res) => res.json())
      .then((res) => alert(res));
  };

  const handlerChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user?.email) {
      setForm({
        ...form,
        email: user?.email,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postCommentsPosts(form, "posts").then((response) =>
      getCommentsPosts("posts")
        .then((res) => res.json())
        .then((res) => setAllPost(res))
    );

    setForm({
      ...form,
      title: "",
      content: "",
      image: "",
    });
  };

  const onDeletePost = (id: string) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then( (result)=> {

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      if (result.isConfirmed) {

        deleteCommentsPosts(
          {
            email: form.email,
            idPost: id,
          },
          "posts"
        ).then((res) =>
          getCommentsPosts("posts")
            .then((res) => res.json())
            .then((res) => {
              setAllPost(res)
              setallPostRespaldo(res);
              setAddEdit(!addEdit)
            })
        )
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Post deleted",
          });
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Toast.fire({
          icon: "error",
          title: "Operation cancelled",
        });
      }
    })

    
  };

  const onDeleteComment = (id: string, email: string) => {
    
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCommentsPosts(
            {
              email: email,
              idComment: id,
            },
            "comments",
            id
          )
            .then((res) =>
              getCommentsPosts("posts")
                .then((res) => res.json())
                .then((res) => {
                  setAllPost(res)
                  setallPostRespaldo(res)
                  setAddEdit(!addEdit)
                })
            )
            .then(() => {

              const Toast = Swal.mixin({
                toast: true,
                position: "bottom-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: "Comment deleted",
              });

              
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });

    // deleteCommentsPosts(
    //   {
    //     email: email,
    //     idComment: id,
    //   },
    //   "comments",
    //   id
    // ).then((res) =>
    //   getCommentsPosts("posts")
    //     .then((res) => res.json())
    //     .then((res) => setAllPost(res))
    // );
  };

  const handlerSubmitEdit = async (content: string, id: string) => {
    putCommentsPosts({ content }, id, "posts")
    .then( res => {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
      Toast.fire({
        icon: "success",
        title: "Post Edited",
      });
    })
    .then((res) => {
      setAddEdit(!addEdit);
    })
  };

  const handleFilterByTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterPost = allPostRespaldo.filter((post) => {
      if (post.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return post;
      }
    });
    

    if (filterPost.length) {
      setAllPost(filterPost);
    } else {
      setAllPost(allPostRespaldo);
      Swal.fire({
        title: "No result",
        icon: "error"
      })
    }
  };

  const handleFilterByCategory = (category:string) => {
    
    const filterPost = allPostRespaldo.filter((post) => {
      if(post.category){

        if (post.category.toLowerCase()===category.toLowerCase()) {
          return post;
        }
      }
    });
    setAllPost(filterPost);
  };


  const resetFilter = () => {
    setAllPost(allPostRespaldo);
  };
  
  const handlerConsole = ()=> {
    console.log('conectado')
  }

  return [
    form,
    commentary,
    allPost,
    editOpen,
    editPost,
    allPostRespaldo,
    searchInput,
    selectedTag,
    previewTag,
    addLike, 
    addPost, 
    addEdit, 
    addComment,
    
    {
      likeHandler,
      handlerLike,
      handlerSubmit,
      handlerSubmitEdit,
      handlerChangePost,
      submitPost,
      onDeletePost,
      onDeleteComment,
      setAllPost,
      editHandlerModal,
      setEditOpen,
      setEditPost,
      handlerChangeComment,
      submitComment,
      likeCommentHandler,
      setallPostRespaldo,
      onChangeSearch,
      handleFilterByTitle,
      resetFilter,
      handleTags,
      handleFilterByCategory,
      setSelectedTag,
      HandlerpreviewTags,
      handlerQuitPreview,
      handlerConsole,
      setForm
    },
  ];
}
