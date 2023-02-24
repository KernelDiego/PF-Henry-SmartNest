import { useEffect, useState, useRef } from "react";
import { NavLink } from 'react-router-dom';
import { Foro_Menu } from '../Foro_Menu/Foro_Menu';
import { Foro_card } from '../Foro_card';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../Redux/hook';
import { useForoHome } from '../../ForoHome/hooks/useForoHome';
import { userInterface } from '../../../../Redux/slice/user/user.slice';
import { changePicture } from '../../../../Redux/slice/user/user.slice';
import ScrollUp from "../../../../components/scrollUp/ScrollUp";

//--- ICON --------
import defaultBanne from '../../../../assets/images/SmartBackground.jpg';
import PostIcon from '../../../../assets/foro/postsIcon.svg';
import edit from '../../../../assets/foro/edit.svg';
import commentIcon from '../../../../assets/foro/commentsIcon.svg';
import logoDiscord from '../../../../assets/discord.svg';

//--- HELPERS ---------
import { getFormatedUsers } from '../../../../../helpers/user/getFormatedUsers';
import { getAllPostUser } from '../../../../../helpers/user/getAllPostUser';
import { uploadImage } from '../../../../../helpers/foro/uploadImage';
import { putProfileBanner } from '../../../../../helpers/user/putProfileBanner';
import { putProfilePicture } from '../../../../../helpers/user/putProfilePicture';
import { getUserByEmail } from '../../../../../helpers/user/getUserByEmail';
import { UserByID } from '../../../../../helpers/user/getUserByID';
import { notification } from '../../../../../helpers/foro/notification';
//---------------------

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  picture: string;
  role: string;
  posts: string[];
  comments: string[];
  banner: string;
}

interface iOtherUser {
  _id: string;
  username: string;
  picture: string;
  email: string;
}

export const Foro_Profile = () => {
  const [User, setUser] = useState<UserProfile>({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    comments: [],
    picture: "",
    banner: "",
    posts: [],
    role: "",
  });
  const [refresh, setRefresh] = useState<boolean>(false);
  const [postByUser, setPostByUser] = useState([]);
  const [bannerChange, setBannerChange] = useState<string>("");
  const [imageChange, setImageChange] = useState<string>("");
  const [onLoadPost, setOnLoadPost] = useState<boolean>(false);
  const [otherUsers, setOthersUsers] = useState<iOtherUser[]>([]);
  const { id } = useParams();
  const userByBd: userInterface = useAppSelector(
    state => state.userReducer.userState
  );
  const dispatch = useAppDispatch();

  // Hook
  const [
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
      handlerConsole,
    },
  ]: any = useForoHome();

  const ref = useRef<HTMLDivElement>(null);

  // GET User information
  useEffect(() => {
    if (id) {
      UserByID(id).then(res => {
        setUser(res);
      });
    }
  }, [
    refresh,
    addLike,
    addPost,
    addEdit,
    addComment,
    imageChange,
    bannerChange,
  ]);

  // GET Post user
  useEffect(() => {
    if (User.email) {
      getAllPostUser(User.email).then(res => {
        setPostByUser(res);
        setOnLoadPost(true);
      });
    }
  }, [User, refresh, addLike, addPost, addEdit, addComment]);

  // UPDATE BANNER
  useEffect(() => {
    if (bannerChange) {
      putProfileBanner(userByBd.email, bannerChange)
        .then(res => res.json)
        .then(res => {
          notification.fire({
            icon: "success",
            title: "You have changed your Banner picture",
          });
        });
      dispatch(changePicture({ banner: bannerChange }));
      setRefresh(!refresh);
      setBannerChange("");
    }
  }, [bannerChange]);

  // UPDATE Profile Pic
  useEffect(() => {
    if (imageChange) {
      putProfilePicture(userByBd.email, imageChange)
        .then(res => res.json())
        .then(res => {
          notification.fire({
            icon: "success",
            title: "You have changed your profile picture",
          });
        });
      dispatch(changePicture({ picture: imageChange }));
      setRefresh(!refresh);
      setImageChange("");
    }
  }, [imageChange]);

  useEffect(() => {
    getFormatedUsers().then(res => {
      setOthersUsers(res);
    });
  }, []);

  const changeUser = (e: any) => {
    setPostByUser([]);
    setUser({
      _id: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      comments: [],
      picture: "",
      banner: "",
      posts: [],
      role: "",
    });
    setOnLoadPost(false);

    getAllPostUser(e.target.id).then(res => {
      setPostByUser(res);
      setOnLoadPost(true);
    });
    getUserByEmail(e.target.id).then(res => {
      setUser(res);
    });
  };

  return (
    <div className='Foro_Profile_ALLContainer'>
      <Foro_Menu
        refresh={refresh}
        setRefresh={setRefresh}
        setUser={setUser}
        setOnLoadPost={setOnLoadPost}
        setPostByUser={setPostByUser}
      />

      <div className='FORO_PROFILE'>
        <div className='Foro_Profile_PostSide' ref={ref}>
          <div className='Foro_Profile_Container'>
            <div className='Foro_Profile_Banner_PicturesSide'>
              {userByBd._id == id && (
                <label
                  htmlFor='file-input'
                  className='Modal_custom-file-upload'
                >
                  <img className='editButton' src={edit} alt='edit' />
                </label>
              )}
              <input
                onChange={e => uploadImage(e, setBannerChange)}
                className='Foro_Baner_Input'
                id='file-input'
                type='file'
              ></input>
              {userByBd._id == id && (
                <label
                  htmlFor='profile-input'
                  className='Modal_custom-file-upload'
                >
                  <img className='editProfilePicButton' src={edit} alt='edit' />
                </label>
              )}
              <input
                onChange={e => uploadImage(e, setImageChange)}
                className='Foro_Baner_Input'
                id='profile-input'
                type='file'
              ></input>
              <img
                src={User.banner ? User.banner : defaultBanne}
                alt='banner'
              />
              <img
                className={User.picture ? "profilePic" : "profilePicDefault"}
                src={User.picture ? User.picture : logoDiscord}
                alt='profilePic'
              />
            </div>

            <div className='Foro_Profile_NameSide'>
              {User.firstName && (
                <h1>
                  {`${User.firstName} ${User.lastName}`.length <= 15
                    ? `${User.firstName} ${User.lastName}`
                    : `${User.firstName} ${User.lastName[0]}.`}
                </h1>
              )}
              {User.firstName && <p>{User.username}</p>}
              {!User.firstName && (
                <h1 className='Foro_Profile_NameDefault'>{User.username}</h1>
              )}
            </div>

            <div className='Foro_Profile_ContentSide'>
              <div className='Foro_Profile_StatContainer'>
                <img src={PostIcon} alt='Post' />
                <p>Post: {postByUser.length}</p>
              </div>
              <div className='Foro_Profile_StatContainer'>
                <img src={commentIcon} alt='comments' />
                <p>Comments: {User.comments.length}</p>
              </div>
            </div>
          </div>
          {postByUser.length ? (
            postByUser?.map((post: any) => (
              <Foro_card
                commentary={commentary}
                handlerChangeComment={handlerChangeComment}
                submitComment={submitComment}
                key={post._id}
                id={post._id}
                title={post.title}
                content={post.content}
                img={post.image}
                post={post}
                author={post.author.userName || post.author.username}
                email={post.author.email}
                userId={post.author._id}
                comments={post.comments}
                likes={post.likes}
                onDeletePost={onDeletePost}
                onLikePost={likeHandler}
                onEdit={editHandlerModal}
                created={post.created}
                onDeleteComment={onDeleteComment}
                likeCommentHandler={likeCommentHandler}
                category={post.category}
              />
            ))
          ) : !onLoadPost ? (
            <img
              className='foro_home_loaderGif'
              src='https://usagif.com/wp-content/uploads/loading-25.gif'
              alt='loader'
            />
          ) : (
            <div className='foro_profile_NotPost'>
              <p>{User.username} has not published any post yet</p>
            </div>
          )}
          <ScrollUp refUse={ref} />
        </div>

        <div className='foro_profile_UserListContainer'>
          <div className='foro_profile_UserList_Header'>
            <h3>Most active users</h3>
          </div>
          <div className='foro_profile_UserList_Content'>
            {otherUsers.map(user => {
              return (
                <NavLink
                  id={user.email}
                  key={user._id}
                  onClick={changeUser}
                  to={`/foro/profile/${user._id}`}
                  className='foro_profile_UserList_Container'
                >
                  <div
                    id={user.email}
                    className='foro_profile_UserList_ImgSide'
                  >
                    <img id={user.email} src={user.picture} />
                  </div>
                  <div
                    id={user.email}
                    className='foro_profile_UserList_NameSide'
                  >
                    <p id={user.email}> {user.username}</p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
