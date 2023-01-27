import { useEffect } from 'react';
import Carrousel from '../carrousel/carrousel';
import Card from '../carrousel/cardCarrousel';
import logoWhite from '../../assets/logo_smart_w.png';
import img_home1 from '../../assets/home_img_1.png';
import img_home2 from '../../assets/home_img_2.png';
import img_home3 from '../../assets/home_img_3.png';
import { NewsHome } from '../home_news_fake/NewsHome';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hook';
import { userFetch } from '../../Redux/slice/user/userController';
import { getUserLogin } from '../../Redux/slice/user/user.slice';
import { productNews } from './productNews';

const Home = () => {
  const dispatch = useAppDispatch();
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getUserByBd = async () => {
      if (isAuthenticated) {
        const userByBd = await userFetch(user?.email as string);
        dispatch(getUserLogin(userByBd));
      }
    };

    getUserByBd();
  }, [isAuthenticated]);

  return (
    <div className='home_wrapper'>
      {/*  Image And Title */}
      <div className='home_imageTitlteContainer'>
        <div className='home_imageTitleDiv'>
          <div className='home_titleContainer'>
            <p className='home_text_1'>Innovate</p>
            <p className='home_text_2'>Home</p>
            {!isAuthenticated && (
              <button onClick={() => loginWithRedirect()} className='home_button_li'>
                Login
              </button>
            )}
          </div>
          <div className='home_imageContainer'>
            <img src={img_home1} alt='logo' />
          </div>
        </div>
      </div>

      {/* Carrousel Side */}
      <div className='home_container_carrouselSide'>
        <div className='home_carrousel_logo'>
          <img src={logoWhite} alt='logo' />
        </div>
        <div className='home_container_imagediv'>
          <img className='home_carrouselIMG' src={img_home2} alt='image-1' />
        </div>
        <div className='home_carrousel_ContainerDiv'>
          <Carrousel>
            {productNews.map((e, i) => (
              <Card
                description={e.description}
                key={e._id}
                name={e.name}
                images={e.images[0]}
                rating={e.rating}
                price={e.price}
              />
            ))}
          </Carrousel>
        </div>
      </div>

      {/* News Section */}
      <div className='home_news_container'>
        <div className='home_news_side'>
          <div className='news_title'>
            <h1 className='title-news'>News</h1>
          </div>

          <NewsHome />

          <div className='news_back'>
            <NavLink className='news_navLink_readMore' to='/news'>
              <h3 className='read-more-news'>Read More...</h3>
            </NavLink>
          </div>
        </div>

        <div className='home_news_image_side'>
          <img src={img_home3} alt='home-news-image' />
        </div>
      </div>
    </div>
  );
};

export default Home;
