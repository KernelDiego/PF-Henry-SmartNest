import close from "../../../../assets/foro/cancel.svg";
import { useEditPost, EditPost } from "./hook/useEditPost";

export default function Foro_editPost({ onSave, id, content, onClose }: EditPost) {

const [formEdit, { closeModal, changeHandler, saveModal }]:any =
  useEditPost({ onSave, id, content, onClose });

  return (
    <div className='foro_create_overlay'>
      <div className='foro_create_containere'>
        <div className='foro_create_header'>
          <p>Edit Content</p>
          <img onClick={closeModal} src={close} alt='closeIcon' />
        </div>
        <div className='foro_create_content'>
          <textarea
            onChange={e => changeHandler(e)}
            name='content'
            value={formEdit.content}
            className='foro_create_EditTextArea'
            placeholder='content'
          />
        </div>
        <div className='foro_create_submit'>
          <button onClick={saveModal}>Save</button>
        </div>
      </div>
    </div>
  );
}
