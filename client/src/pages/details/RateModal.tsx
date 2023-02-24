import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import imgVerify from "../../assets/verified/Email_no_verify.png";
import userVerify from "../../assets/verified/User_no_loged.png";
import { useNavigate } from "react-router-dom";

const RateModal: React.FC<{}> = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/");
  };

  return (
    <div className="Modal_Cart_Overlay">
      <div className="Modal_Cart_Container">
        {!user && (
          <div className="Modal_Cart_Info">
            <img src={userVerify} alt="non-user-loged" />
            <h1>
              It looks like you have not logged in yet, please log in or
              register to be able to rate products"
            </h1>
            <div className="Modal_Cart_submitContainer">
              <button onClick={loginWithRedirect}>Login</button>
              <button onClick={backHandler}>Back</button>
            </div>
          </div>
        )}
        {user && !user?.email_verified && (
          <div className="Modal_Cart_Info">
            <img src={imgVerify} alt="non-Verified-Email" />
            <h1>You need to verify your Email to rate products</h1>
            <button onClick={backHandler}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateModal;
