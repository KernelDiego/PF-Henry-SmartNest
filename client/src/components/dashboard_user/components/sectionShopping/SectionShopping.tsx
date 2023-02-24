import React from "react"

export const SectionShopping: React.FC<any> = ({ setOpen, open, info }) => {

  return (
    <div
      className='dash_infouser_container'
      onClick={() => setOpen(!open)}
    >
      <div className='dash_infouser_title'>
        <img
          className='dash_infouser_imageMenu'
          src={info.img}
          alt='profileInfo'
        />
        <h2>{info.title}</h2>
      </div>
      <p>{info.p}</p>
    </div>
  );
};
