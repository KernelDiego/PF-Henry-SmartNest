import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// Auth0
import { useAuth0 } from "@auth0/auth0-react";
import Auth0 from "auth0-js";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "../../../../../../config";
// Redux
import { useAppDispatch } from "../../../../../Redux/hook";
import { changeUser } from "../../../../../Redux/slice/user/user.slice";
import { putUserFetch } from "../../../../../Redux/slice/user/userController";
import { putProfilePicture } from "../../../../../../helpers/user/putProfilePicture";
import { changePicture } from "../../../../../Redux/slice/user/user.slice";
import { Form, HookProps } from "../interface/iModaleUser";

export const useModalUser = ({ close, userByBd }: HookProps) => {
  const [imageUpload, setImageUpload] = useState<string>("");
  const [changingIMG, setChangingIMG] = useState<boolean>(false);
  const { user } = useAuth0();

  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "SmartNest");
      formData.append("upload_preset", "db1xdljk");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dg1roy34p/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUpload(data.secure_url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (imageUpload && user?.email) {
      setChangingIMG(true);
      putProfilePicture(user.email, imageUpload)
        .then(res => res.json())
        .then(res => {
          setChangingIMG(false);
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "You have changed your profile picture",
          });
        });
      dispatch(changePicture({ picture: imageUpload }));
    }
  }, [imageUpload]);

  const info: {
    username: string;
    picture: string;
    firstName: string;
    lastName: string;
  } = {
    username: userByBd?.username,
    picture: userByBd?.picture,
    firstName: userByBd?.firstName,
    lastName: userByBd?.lastName,
  };

  const [form, setForm] = useState<Form>(info);

  const dispatch = useAppDispatch();

  const handleChangePassword = () => {
    var webAuth = new Auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
    });

    webAuth.changePassword(
      {
        connection: userByBd.connection,
        email: userByBd.email,
      },
      function (err: any, resp: any) {
        if (err) {
          console.log(err.message);
        } else {
          console.log(resp);
        }
      }
    );
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChange = async () => {
    const userUpdated = await putUserFetch(
      {
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
      },
      userByBd?._id
    );

    dispatch(changeUser(userUpdated));
    setImageUpload("");
    close(false);
  };

  return {
    form,
    changingIMG,
    uploadImage,
    handlerChange,
    handleChangePassword,
    handleSaveChange,
  };
};
