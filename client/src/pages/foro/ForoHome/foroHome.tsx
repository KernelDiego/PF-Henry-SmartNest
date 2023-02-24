import { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useForoHome } from "./hooks/useForoHome";
import ScrollUp from "../../../components/scrollUp/ScrollUp";

import { Foro_card } from "../components/Foro_card";
import Foro_editPost from "../components/EditPost/Foro_editPost";
import FilterPanel from "../components/Filter_panel";
import Foro_createPost from "../components/Foro_createPost";
import { Foro_Menu } from "../components/Foro_Menu/Foro_Menu";
import { foro_PanelHook } from "./hooks/foro_PanelHook";
//---------------

export default function ForoHome() {
  //-------CUSTOM HOOK-------
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
      handlerSubmit,
      handlerSubmitEdit,
      handlerChangePost,
      onDeletePost,
      onDeleteComment,
      editHandlerModal,
      setEditOpen,
      handlerChangeComment,
      submitComment,
      likeCommentHandler,
      setallPostRespaldo,
      onChangeSearch,
      handleFilterByTitle,
      resetFilter,
      handleTags,
      handleFilterByCategory,
      HandlerpreviewTags,
      handlerQuitPreview,
      setForm,
    },
  ]: any = useForoHome();

  const [{ FiltersOpen, setFiltersOpen }] = foro_PanelHook();
  //-------CUSTOM HOOK-------

  const { user, isAuthenticated } = useAuth0();
  const [refresh, setRefresh] = useState<boolean>(false);

  const [visible, setVisible] = useState(false);
  const foroRef = useRef<HTMLDivElement>(null);

  const toggleVisible = () => {
    const scrolled = foroRef.current?.scrollTop;
    if (scrolled && scrolled > 300) setVisible(true);
    else if (scrolled && scrolled <= 300) setVisible(false);
  };

  const scrollToTop = () => {
    foroRef?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setVisible(false)
  };

  foroRef.current?.addEventListener("scroll", toggleVisible);

  return (
    <div className='foro_home_container'>
      {editOpen && (
        <Foro_editPost
          onSave={handlerSubmitEdit}
          id={editPost.id}
          content={editPost.content}
          onClose={setEditOpen}
        />
      )}
      <Foro_Menu refresh={refresh} setRefresh={setRefresh} />

      <div className='FORO_HOME_SIDE'>
        <div className='foro_posts_container' ref={foroRef}>
          {isAuthenticated && (
            <Foro_createPost
              selectedTag={selectedTag}
              handleTags={handleTags}
              form={form}
              handlerChangePost={handlerChangePost}
              handlerSubmit={handlerSubmit}
              previewTag={previewTag}
              HandlerpreviewTags={HandlerpreviewTags}
              handlerQuitPreview={handlerQuitPreview}
              setForm={setForm}
              FiltersOpen={FiltersOpen}
              setFiltersOpen={setFiltersOpen}
            />
          )}

          {allPost.length ? (
            <>
              {allPost?.map((post: any) => (
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
              ))}
              <ScrollUp refUse={foroRef}/>
            </>
          ) : (
            <img
              className='foro_home_loaderGif'
              src='https://usagif.com/wp-content/uploads/loading-25.gif'
              alt='loader'
            />
          )}
        </div>
        <div
          className={
            FiltersOpen ? "FORO_HOME_PANELdiv" : "FORO_HOME_PANELdiv_OFF"
          }
        >
          <FilterPanel
            handleFilterByCategory={handleFilterByCategory}
            resetFilter={resetFilter}
            handleFilterByTitle={handleFilterByTitle}
            onChangeSearch={onChangeSearch}
            searchInput={searchInput}
          />
        </div>
      </div>
    </div>
  );
}
