import React from "react";
import { TeamSorted, defaultOption } from "./team";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import logoDiscord from "../../assets/discord.svg";
import Lottie from "react-lottie";
import smartHome from "../../assets/Lotie/smart-home.json";

export const About:React.FC = () => {
  return (
    <div className='About_back'>
      <div className='About_AboutSide'>
        <div className='About_About_header'>
          <h1>About SmartNest</h1>
        </div>
        <div className='About_About_Content'>
          <div className='About_AboutIMG'>
            <Lottie
              options={{ animationData: smartHome, ...defaultOption }}
              width={400}
              height={300}
            />
          </div>
          <div className='About_AboutTextSide'>
            <p>
              Welcome to <strong>SmartNest</strong>, the leading technology
              platform for the home. Here you will find a wide selection of
              smart products to improve the efficiency and comfort of your home.
              Stay up to date on the latest technology news and trends through
              our news section. Interact with other technology enthusiasts in
              our forum and be a part of the SmartNest community. A smart home
              is a happy home!
            </p>
          </div>
        </div>
      </div>
      <div className='About_OurTeam'>
        <div className='About_OurTeam_header'>
          <h1>Our Team</h1>
        </div>
        <div className='About_OurContent'>
          {TeamSorted.map(card => {
            return (
              <div className='About_cardContainer' key={card.name}>
                <div className='About_PictureSide'>
                  <img
                    src={card.picture ? card.picture : logoDiscord}
                    alt='profilePic'
                  />
                  :
                </div>
                <div className='About_cardHeader'>
                  <h1>{card.name}</h1>
                </div>
                <div className='About_socialSide'>
                  <a href={card.github} target='_blank'>
                    <img src={github} alt='githubIcon' />
                  </a>
                  <a href={card.linkedin} target='_blank'>
                    <img src={linkedin} alt='linedinIcon' />
                  </a>
                </div>
                <div className='About_cardContainerReflex'></div>
                <div className='About_cardContainerReflexMin'></div>
                <div className='About_cardContainerReflexBottom'></div>
                <div className='About_cardContainerReflexMinBottom'></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
