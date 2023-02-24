// Img
import closeWindows from "../../../../assets/close.svg";
import changePic from "../../../../assets/changePicture.svg";

import { useModalUser } from "./hooks/useModalUser";
import { HookProps } from "./interface/iModaleUser";

const ModalUser = ({ close, userByBd }: HookProps) => {
  const {
    form,
    changingIMG,
    uploadImage,
    handlerChange,
    handleChangePassword,
    handleSaveChange,
  } = useModalUser({ close, userByBd });

  return (
    <div className='Modal_Overlay'>
      <div className='Modal_Container'>
        <div className='Modal_ProfilePic'>
          <div className='Modal_PicContainer'>
            <img src={userByBd.picture} alt='profilePic' />
            {/*<input id="file-input" onChange={uploadImage} name='file' type='file'/>*/}

            <label htmlFor='file-input' className='Modal_custom-file-upload'>
              <img
                className='modal_ChangePicICON'
                src={changePic}
                alt='changePic'
              />
            </label>
            <input
              onChange={uploadImage}
              className='modal_pic_input'
              id='file-input'
              type='file'
            ></input>
          </div>
        </div>
        <div className='Modal_TitleContainer'>
          <h1>Edit Profile</h1>
        </div>

        <div className='Modal_infoSide'>
          <div className='Modal_info1'>
            <p>Email</p>
            <input
              onChange={handlerChange}
              name='email'
              type='text'
              placeholder='email'
              value={userByBd?.email}
            />
            <p>Username</p>
            <input
              onChange={handlerChange}
              name='username'
              type='text'
              placeholder='username'
              value={form.username}
            />
            <p>First name</p>
            <input
              onChange={handlerChange}
              name='firstName'
              type='text'
              placeholder='firstName'
              value={form.firstName}
            />
            <p>Last name</p>
            <input
              onChange={handlerChange}
              name='lastName'
              type='text'
              placeholder='lastName'
              value={form.lastName}
            />
          </div>
        </div>
        <div className='Modal_SubmitContainer'>
          <button className='Modal_resetButton' onClick={handleChangePassword}>
            Reset Password
          </button>
          <button
            disabled={changingIMG ? true : false}
            className='Modal_buttonSave'
            onClick={handleSaveChange}
          >
            Save
          </button>
        </div>
        <img
          className='Modal_buttonCancel'
          onClick={() => close(false)}
          src={closeWindows}
          alt='closeWindows'
        />
      </div>
    </div>
  );
};

export default ModalUser;
