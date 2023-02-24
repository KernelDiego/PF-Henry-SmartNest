import React from 'react';
import Lottie from 'react-lottie';
import img404 from '../../assets/Lotie/404notfound.json';

interface LottieOptions {
  loop: boolean,
  autoplay: boolean,
  rendererSettings: { preserveAspectRatio: string}
}


const defaultOption: LottieOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

interface Props {};

const Page404: React.FC<Props> = () => {
  return (
    <div className='page404_Container'>
      <h1>Oops!</h1>
      <Lottie options={{ animationData: img404, ...defaultOption }} width={400} height={300} />

      <div className='page404_textContainer'>
        <h3>The page you are looking for does not exist</h3>
        <h3>it might have been moved or deleted</h3>
      </div>
    </div>
  );
};

export default Page404;