import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ProductState } from '../../../../Redux/slice/product/product.slice';
import { useAppSelector, useAppDispatch } from '../../../../Redux/hook';
import { toast, Zoom } from 'react-toastify';
import { addProduct, deleteProduct } from '../../../../Redux/slice/shoppingCart/shoppingCart.slice';
// Img
import eyeW from '../../../../assets/foro/DarkMode/eyeW.svg';
import eyeB from '../../../../assets/foro/DarkMode/eyeB.svg';

import { Rating } from '@mui/material';

//import "./quicklook.css";
import { Link } from 'react-router-dom';

interface Props {
  product: ProductState;
  handleAddCart: (product: ProductState) => void;
  // handleRemoveCart: (product: ProductState) => void;
  priceFormat: (price: number) => string;
}

const QuickLookModal: React.FC<Props> = ({
  product,
  handleAddCart,
  priceFormat,
  // handleRemoveCart,
}) => {
  const [showModal, setShowModal] = useState(false);
  const dark: boolean = useAppSelector((state) => state.themeReducer.dark);

  const [mainImage, setMainImage] = useState('');
  const thumbnailImages = product.images?.filter((image) => image !== mainImage);

  useEffect(() => {
    setMainImage(product.images[0]);
  }, [product]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector((state) => state.cartReducer.Products);

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
    <div className='container-quickLook'>
      <Button size='small' onClick={handleOpenModal}>
        <img className='quickLook_eye' src={dark ? eyeW : eyeB} alt='EYE' />
      </Button>
      <Modal open={showModal} onClose={handleCloseModal} className='modal'>
        <div className='paper'>
          <div className='product-info'>
            <div className='modal-images'>
              <div className='main-image-container'>
                <img src={mainImage} className='main-image' />
              </div>
              <div className='thumbnail-container'>
                {thumbnailImages?.map((image, i) => (
                  <div className='container-image' key={i}>
                    <img
                      src={image}
                      key={i}
                      className='thumbnail-image'
                      onMouseEnter={() => setMainImage(image)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className='product-details-container'>
              <div className='product-name'>{product.name}</div>
              <div className='product-brand'>{product.brand}</div>
              <div className='product-price'>$ {priceFormat(product.price)}</div>
              <div className='product-rating'>
                <div className='rating'>
                  <Rating
                    className='star-rating'
                    value={Number(product.rating.toFixed(2))}
                    precision={0.1}
                    readOnly
                  />
                  <div className='value-raing'>{Number(product.rating.toFixed(2))}</div>
                </div>

                <div className='details2'>
                  <div className='content-Buttons'>
                    {product.stock > 0 && !productsInCart.find((el) => el._id === product._id) ? (
                      <div className='add-car-card-beta' onClick={() => handleAddCart(product)}>
                        <p>add to Cart</p>
                      </div>
                    ) : product.stock > 0 && productsInCart.find((el) => el._id === product._id) ? (
                      <div className='add-car-card-beta' onClick={() => handleRemoveCart(product)}>
                        <p>Remove</p>
                      </div>
                    ) : (
                      <div className='add-car-card-beta'>
                        <button disabled>out of Stock</button>
                      </div>
                    )}

                    <Link to={`/product/${product._id}`}>
                      <div className='add-car-card-beta'>
                        <p>See More</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuickLookModal;
