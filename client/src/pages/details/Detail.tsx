import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { getProduct, ProductState } from '../../Redux/slice/product/product.slice';
import { getProductId } from '../../Redux/slice/product/product.slice';
import { productFetch, productIdFetch } from '../../Redux/slice/product/ProductController';
import { Link } from 'react-router-dom';

import Ratingcomp from './Ratingcomp';
import ShareIcon from '@mui/icons-material/Share';
import FacebookCom from './FacebookCom';

import ForumIcon from '@mui/icons-material/Forum';

//.........
import {
  addProduct,
  deleteProduct,
  ProductCart,
} from '../../Redux/slice/shoppingCart/shoppingCart.slice';
import { toast, Zoom } from 'react-toastify';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  InstapaperIcon,
} from 'react-share';

import { IconButton, Rating } from '@mui/material';

import star from '../../assets/images/icons/iconStartB.png';

const Detail: React.FC<{}> = () => {
  const id = useParams().id as string;
  const dispatch = useAppDispatch();

  const productDetail: ProductState = useAppSelector((state) => state.productReducer.ProductDetail);

  const allProducts: ProductState[] = useAppSelector((state) => state.productReducer.Products);

  const productsInCart = useAppSelector((state) => state.cartReducer.Products);
  //----------------------> SHARE FEATURE  <----------------------------

  // const currentPageUrl = window.location.href;
  // const currentPageUrl = `https://henry-pf-smartnest.netlify.app/product/${productDetail._id}`
  const currentPageUrl = `https://smartnest-pf.netlify.app//shop${productDetail._id}`;

  //-----------------------> ADD TO CART BUTTON <-------------------------

  const handleAddCart = (product: ProductState) => {
    const productCart: ProductCart = {
      _id: product._id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      images: product.images,
      categories: product.categories,
      stock: product.stock,
      quantity: 1,
      inCart: true,
    };

    dispatch(addProduct(productCart));

    toast.success('Product added to Cart', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom,
    });
  };

  const handleRemoveCart = (product: ProductState) => {
    dispatch(deleteProduct(product._id));

    toast.error('Product removed from Cart', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom,
    });
  };

  const [principalImage, setPrincipalImage] = useState<string>('');
  const [relatedProduct, setRelatedProduct] = useState<ProductState[]>([]);
  //console.log("ssssssssssssssssssss", relatedProduct);
  useEffect(() => {
    productFetch().then((res) => {
      dispatch(getProduct(res));
    });
  }, []);

  useEffect(() => {
    productIdFetch(id).then((res) => {
      dispatch(getProductId(res));
      handleFilter(res);
      setPrincipalImage(res.images[0]);
    });
  }, [allProducts, id]);

  const handleSetImage = (image: string) => {
    setPrincipalImage(image);
  };

  const handleFilter = (res: any) => {
    let aux = allProducts.filter(
      (product: ProductState) => product.categories._id === res.categories,
    );

    if (aux.length > 5) aux = aux.slice(0, 5);
    setRelatedProduct(aux);
  };

  // brand:"TJOY"
  // categories:"63bebc6c001d5278f72b926c"
  // description:"Tuya Smart App Control, Group control/Music sync, Timer and Schedule, Work With Alexa/Google Assistant/Siri, RGB Color Changing/Brightness Dimmable, Tuya Smart App allows you to change color and brightness via phone. It will change the bulbs scenes follow the music you played. Also, Tuya Smart App has a timer and scheduler mode. And when you are not home, Tuya Smart APP allows you to control the bulb without distance limit."
  // images:(4)['https://m.media-amazon.com/images/I/71p+7k2OFeL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61Tzi0T2naL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81OZy+uf6XL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81z3XOeWFbL._AC_SL1500_.jpg']
  // name:"Alexa Smart Light Bulbs"
  // price:66.99
  // rating:4.2
  // stock:17
  // _id:"63c6db802aaabb925fc78a56"

  return (
    <div className='detail-contain'>
      <div className='info-pincipal-detail'>
        {/* <div className="land-images">
          {productDetail?.images?.map((image) => (
            <div key={image.slice(5)} className="secondary-images">
              <img
                src={image}
                onMouseOver={() => {
                  handleSetImage(image);
                }}
              />
            </div>
          ))}
        </div> */}

        <div className='land-images'>
          {productDetail?.images?.map((image) => (
            <div key={image.slice(5)} className='secondary-images'>
              <img
                src={image}
                onMouseOver={() => {
                  handleSetImage(image);
                }}
              />
            </div>
          ))}
        </div>
        <div>{/* <FacebookCom /> */}</div>
        <div className='imagen-principal-detail'>
          <div className='principal-image'>
            <img src={principalImage} alt={productDetail.name} />
          </div>
        </div>
        <div className='principal-details'>
          <div className='transaction-details'>
            <div className='name'>{productDetail.name}</div>

            <div className='description-rating-branding'>
              <div className='rating-brand'>
                <div className='rating'>
                  <Rating
                    className='stars'
                    size='large'
                    value={Number(productDetail.rating.toFixed(2))}
                    precision={0.1}
                    readOnly
                  />
                  <div className='product-rating'>{productDetail.rating.toFixed(2)}</div>
                  <div className='brand-nest'>{/* <img src={logo} alt="logo smartNest" /> */}</div>
                </div>
                <div className='resumen'>
                  Brand:<div className='brand'> {productDetail.brand}</div>
                </div>
                <div className='resumen'>
                  stock:<div className='brand'>{productDetail.stock}</div>
                </div>
              </div>
              <div className='description'>
                Description:
                <div className='text-description'>{productDetail.description}</div>
              </div>
            </div>
            <div className='price'>
              <div className='transaction-price'>
                <div className='link-to-forum'></div>
                <div className='value-price'>${productDetail.price.toFixed(2)}</div>
                USD
              </div>
              {/* <button> add to cart</button> */}
              <div className='content-add-car-card-beta'>
                <div className='social-media-buttons-wrap'>
                  <span>
                    Share <ShareIcon />
                  </span>
                  <div className='container-share'>
                    <FacebookShareButton url={currentPageUrl}>
                      <i className='facebook'>
                        <FacebookIcon size={32} round={true} />
                      </i>
                    </FacebookShareButton>
                    <TwitterShareButton url={currentPageUrl}>
                      <i className='twitter'>
                        <TwitterIcon size={32} round={true} />
                      </i>
                    </TwitterShareButton>
                    <WhatsappShareButton url={currentPageUrl}>
                      <i className='whatsapp'>
                        <WhatsappIcon size={32} round={true} />
                      </i>
                    </WhatsappShareButton>
                    <InstapaperShareButton url={currentPageUrl}>
                      <i className='email'>
                        <InstapaperIcon size={32} round={true} />
                      </i>
                    </InstapaperShareButton>
                  </div>
                </div>
                {productDetail?.stock > 0 &&
                !productsInCart.find((el) => el._id === productDetail._id) ? (
                  <div className='add-car-card-beta' onClick={() => handleAddCart(productDetail)}>
                    <p>add to Cart</p>
                  </div>
                ) : productDetail.stock > 0 &&
                  productsInCart.find((el) => el._id === productDetail._id) ? (
                  <div
                    className='add-car-card-beta'
                    onClick={() => handleRemoveCart(productDetail)}
                  >
                    <p>Remove</p>
                  </div>
                ) : (
                  <div
                    className='add-car-card-beta'
                    style={{
                      color: 'rgba(20, 20, 20, 0.8)',
                      backgroundColor: 'rgba(229, 229, 229, 1)',
                      fontFamily: "'Urbanist', sans-serif",
                      fontWeight: '500',
                    }}
                  >
                    out of Stock
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-related-product'>Related products</div>
      <div className='section-description'>
        <div className='detail-detail'>
          {relatedProduct?.map((product) => (
            <Link
              to={`/product/${product._id}`}
              className='releated-images'
              style={{
                backgroundImage: `url(${product.images[0]})`,
                backgroundSize: '60%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <p className='detail_product-name'>{product.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='comments-section'>
        <div className='comments-box'>
          <div
            className='fb-comments'
            data-href={`https://henry-pf-smartnest.netlify.app/product/${productDetail._id}`}
            data-width='100%'
            data-numposts='5'
          ></div>
          <span
            className='fb-comments-count'
            data-href={`https://henry-pf-smartnest.netlify.app/product/${productDetail._id}`}
          ></span>
        </div>
        <div className='fb-comments-buttonSide'>
          <div className='other-box'>
            <div className='fb-comments-Title'>
              <p>Rate and review this product</p>
            </div>

            <Ratingcomp
              ratingProp={Number(productDetail.rating.toFixed(2))}
              id={productDetail._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
