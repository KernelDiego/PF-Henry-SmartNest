//------- USUARIO HELPER ----------
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
//---------------
import addIMage from "../../../assets/foro/addImage.svg";
import addIMageW from '../../../assets/foro/DarkMode/adImageW.svg'
import connectivityIconW from '../../../assets/foro/connectivityIconW.svg';
import entertainmentW from '../../../assets/foro/EntertainmentW.svg';
import energyW from '../../../assets/foro/energyW.svg';
import securityW from '../../../assets/foro/securityW.svg';
import healthW from '../../../assets/foro/health.svg';
import confort from '../../../assets/foro/confortW.svg';
import filterW from '../../../assets/foro/DarkMode/filterW.svg'
import filter from '../../../assets/foro/filterIcon.svg'
import { uploadImage, uploadImagePost } from "../../../../helpers/foro/uploadImage";


export default function Foro_createPost({
  form,
  handlerChangePost,
  handlerSubmit,
  handleTags,
  selectedTag,
  previewTag,
  HandlerpreviewTags,
  handlerQuitPreview,
  setForm,
  FiltersOpen,
  setFiltersOpen,
}: any) {

  const [uploadinImg, setUploading] = useState<boolean>(false);
  const [charged, setCharged] = useState<boolean>(false)
  const userByBd = useAppSelector((state) => state.userReducer.userState);
  const dark: boolean = useAppSelector((state) => state.themeReducer.dark);


  const handlerImage = (e: any)=> {
    setForm({
      ...form,
      image: ''
    })
    setCharged(true)
    setUploading(true)
    uploadImagePost(e, form,  setForm)
    .then(res => {
      setUploading(false)
    })
  }
  

  return (
    <div className="foro_posts_creator">
      <div className="foro_post_inputsAndImage">
        <div className="foro_posts_inputsSide">
          <img src={userByBd.picture} alt="profilePic" />
        </div>

        <div className="foro_posts_secondInput">
          <input
            value={form.title}
            onChange={handlerChangePost}
            name="title"
            placeholder="Title"
            type="text"
          />
          <textarea
            value={form.content}
            onChange={handlerChangePost}
            name="content"
            className="foro_post_textAREA"
            placeholder="Description"
          />
        
          <div className="foro_post_tags">
            <p className="foro_post_tagP">Category</p>

            <div className={
                  selectedTag["Connectivity and Control"]
                    ? "foro_post_tag_selected"
                    : "foro_post_tag_normal"
                }>
              <p className={
                  previewTag["Connectivity and Control"]
                    ? "previewOn"
                    : "previewOff"
                }>Connectivity and Control</p>
              <img onMouseEnter={HandlerpreviewTags} onMouseLeave={handlerQuitPreview} id="Connectivity and Control" src={connectivityIconW} onClick={handleTags}/>
               
            </div>

            <div className={
                selectedTag["Home Entertainment"]
                  ? "foro_post_tag_selected"
                  : "foro_post_tag_normal"
              }>
              <p className={
                  previewTag["Home Entertainment"]
                    ? "previewOn"
                    : "previewOff"
                }>Home Entertainment</p>
              <img onMouseEnter={HandlerpreviewTags} onMouseLeave={handlerQuitPreview} id="Home Entertainment" onClick={handleTags} src={entertainmentW}/>
            </div>
             
            <div className={
                selectedTag["Energy Management"]
                  ? "foro_post_tag_selected"
                  : "foro_post_tag_normal"
              }>
              <p className={
                  previewTag["Energy Management"]
                    ? "previewOn"
                    : "previewOff"
                }>Energy Management</p>
              <img onMouseEnter={HandlerpreviewTags} onMouseLeave={handlerQuitPreview} id='Energy Management' onClick={handleTags} src={energyW}/>
            </div>

            <div className={
                selectedTag["Safety and Security"]
                  ? "foro_post_tag_selected"
                  : "foro_post_tag_normal"
              }>
                <p className={
                  previewTag["Safety and Security"]
                    ? "previewOn"
                    : "previewOff"
                }>Safety and Security</p>
              <img onMouseEnter={HandlerpreviewTags} onMouseLeave={handlerQuitPreview} id='Safety and Security' onClick={handleTags} src={securityW}/>
            </div>
           
            <div className={
                  selectedTag["Comfort and Ease"]
                    ? "foro_post_tag_selected"
                    : "foro_post_tag_normal"
                }>
                  <p className={
                  previewTag["Comfort and Ease"]
                    ? "previewOn"
                    : "previewOff"
                }>Comfort and Ease</p>
                <img onMouseEnter={HandlerpreviewTags} onMouseLeave={handlerQuitPreview} id='Comfort and Ease' onClick={handleTags} src={confort}/>
            </div>

            <div className={
                  selectedTag["Lifestyle and Health"]
                    ? "foro_post_tag_selected"
                    : "foro_post_tag_normal"
                }>
                  <p className={
                  previewTag["Lifestyle and Health"]
                    ? "previewOn"
                    : "previewOff"
                }>Lifestyle and Health</p>
              <img onMouseEnter={HandlerpreviewTags} onMouseLeave={handlerQuitPreview} id='Lifestyle and Health' onClick={handleTags} src={healthW} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="foro_posts_buttonSide">
        <div className="foro_posts_AddImagen_Container">
          <div className="foro_post_ImageDiv">
                <img onClick={()=> setFiltersOpen(!FiltersOpen)} src={dark?filterW:filter} alt="filters" />
              <label htmlFor="file-input" className="foro_post_Label">
                <img src={dark?addIMageW:addIMage} alt="Add_Image" />
              </label>
              <input onChange={handlerImage} className='foro_post_IMPUT' id="file-input" type="file"></input>
              {
                charged&&(uploadinImg?
                <p>cargando...</p>:<p>Completado</p>)
              }
          </div>
        </div>
        <button disabled={uploadinImg?true:false} onClick={handlerSubmit}>POST</button>
      </div>
    </div>
  );
}
