import { useEffect } from 'react';
import Carrousel from './components/carrousel/carrousel';
import Card from './components/carrousel/cardCarrousel';
import logoWhite from '../../assets/logo_smart_w.png';
import img_home1 from '../../assets/home_img_1.png';
import img_home2 from '../../assets/home_img_2.png';
import img_home3 from '../../assets/home_img_3.png';
import { NewsHome } from './components/home_news_fake/NewsHome';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { userFetch } from '../../Redux/slice/user/userController';
import { getUserLogin } from '../../Redux/slice/user/user.slice';
import { getProduct, ProductState } from '../../Redux/slice/product/product.slice';
import { productFetch } from '../../Redux/slice/product/ProductController';

const Home = () => {
  const dispatch = useAppDispatch();
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const productNews: ProductState[] = useAppSelector(
    (state) => state.productReducer.Products,
  ).slice(0, 8);

  useEffect(() => {
    const getUserByBd = async () => {
      if (isAuthenticated) {
        const userByBd = await userFetch(user as any);
        dispatch(getUserLogin(userByBd));
      }
    };

    getUserByBd();
  }, [isAuthenticated]);

  useEffect(() => {
    productFetch().then((res) => {
      dispatch(getProduct(res));
    });
  }, []);

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
            {productNews.map((e: ProductState, i) => (
              <Card key={e._id} product={e} />
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
