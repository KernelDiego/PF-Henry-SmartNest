import { useState } from "react";

export interface EditPost {
  id: string;
  content: string;
  onClose: any;
  onSave: any;
}

export function useEditPost({ onSave, id, content, onClose }:any) {

  const [formEdit, setFormEdit] = useState({
    content,
    id,
  });

  const closeModal = () => onClose(false);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const saveModal = async () => {
    onSave(formEdit.content, formEdit.id);
    onClose(false);
  };

  return [formEdit, { closeModal, changeHandler, saveModal } ]
}
