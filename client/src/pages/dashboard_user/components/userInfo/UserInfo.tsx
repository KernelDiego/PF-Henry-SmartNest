import React from "react";
// Img
import verified_true from "../../../../assets/verified/verified_true.png";
import verified_false from "../../../../assets/verified/verified_false.png";

export const UserInfo: React.FC<any> = ({
  userByBd,
  user,
  email,
  verified,
}) => {
  return (
    <div className='dash_profileContainer'>
      <div className='dash_profile_ImgSide'>
        <img src={userByBd.picture} alt='picture-profile' />
      </div>
      <div className='dash_profile_InfoSide'>
        <h2>{user?.name?.toUpperCase()}</h2>
        <p>{email}</p>
        <p>
          {verified ? (
            <img src={verified_true} alt='verified_true' />
          ) : (
            <img src={verified_false} alt='verified_false' />
          )}
        </p>
        {
          <p>
            {!verified ? (
              <div>
                <span>Check your email and verify your account</span>
              </div>
            ) : null}
          </p>
        }
      </div>
    </div>
  );
};
