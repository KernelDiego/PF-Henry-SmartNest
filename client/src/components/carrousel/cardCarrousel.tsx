import React from 'react';
import iconStarB from '../../assets/images/icons/iconStartB.png';
import iconStarW from '../../assets/images/icons/iconStartW.png';
import iconStarM from '../../assets/images/icons/iconStartM.png';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { ProductState } from '../../Redux/slice/product/product.slice';
import {
  addProduct,
  deleteProduct,
  ProductCart,
} from '../../Redux/slice/shoppingCart/shoppingCart.slice';
import { toast, Zoom } from 'react-toastify';

interface Props {
  product: ProductState;
}

const Card: React.FC<Props> = ({ product }) => {
  const productsInCart = useAppSelector((state) => state.cartReducer.Products);

  const dispatch = useAppDispatch();

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

  return (
    <div className='cardCarrousel'>
      <div className='HomeCard_HeaderContainer'>
        <p>new</p>
      </div>
      <div className='HomeCard_ImageContainer'>
        <img src={product.images[0]} alt='image_product' />
      </div>
      <div className='HomeCard_NameContainer'>
        <h1>{product.name}...</h1>
      </div>
      <div className='HomeCard_DescriptionContainer'>
        <p>{product.description.substring(0, 50).toLowerCase()}...</p>
      </div>
      <div className='HomeCard_RatingContainer'>
        {[...new Array(Math.floor(product.rating))].map((e, i) => {
          return <img src={iconStarB} alt='' key={i} />;
        })}
        <img src={iconStarM} alt='' />
      </div>
      <div className='HomeCard_PriceContainer'>
        <h1>$ {product.price}</h1>
      </div>
      <div className='HomeCard_AddCartButtonContainer'>
        {product.stock > 0 && !productsInCart.find((el) => el._id === product._id) ? (
          <button className='Home_add-car-card-beta' onClick={() => handleAddCart(product)}>
            Add to Cart
          </button>
        ) : product.stock > 0 && productsInCart.find((el) => el._id === product._id) ? (
          <button className='Home_add-car-card-beta' onClick={() => handleRemoveCart(product)}>
            Remove
          </button>
        ) : (
          <button
            className='Home_add-car-card-beta'
            disabled={true}
            style={{
              color: 'rgba(20, 20, 20, 0.8)',
              backgroundColor: 'rgba(229, 229, 229, 1)',
              fontFamily: "'Urbanist', sans-serif",
              fontWeight: '500',
              cursor: 'no-drop',
            }}
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
