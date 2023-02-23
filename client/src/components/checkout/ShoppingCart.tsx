import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { userInterface } from '../../Redux/slice/user/user.slice';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ProductCart,
  changeQuantity,
  deleteProduct,
  emptyCar,
  addProduct,
} from '../../Redux/slice/shoppingCart/shoppingCart.slice';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ModalCart from './ModalCart';
import { toast, Zoom } from 'react-toastify';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { productFetch } from '../../Redux/slice/product/ProductController';
import { getProduct, ProductState } from '../../Redux/slice/product/product.slice';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const ShoppingCart = () => {
  const [total, setTotal] = useState(0);
  const [checkoutOk, setCheckoutOk] = useState(true);

  const productsInCart = useAppSelector((state) => state.cartReducer.Products);

  const userByBd: userInterface = useAppSelector((state) => state.userReducer.userState);

  const dark: boolean = useAppSelector((state) => state.themeReducer.dark);

  const products = useAppSelector((state) => state.productReducer.Products);

  const { user, isAuthenticated } = useAuth0();

  const dispatch = useAppDispatch();

  useEffect(() => {
    handleTotal();
  }, [productsInCart]);

  useEffect(() => {
    if (productsInCart.length) {
      productFetch().then((res) => {
        dispatch(getProduct(res));

        const productsInCartUpdated: ProductCart[] = [];

        res.forEach((product: ProductState) => {
          if (
            productsInCart.some((productInCart: ProductCart) => productInCart._id === product._id)
          ) {
            const productUpdated: ProductCart = {
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

            productsInCartUpdated.push(productUpdated);
          }
        });

        if (productsInCartUpdated.length > 0) {
          dispatch(addProduct(productsInCartUpdated));

          if (productsInCartUpdated.some((product) => product.stock <= 0)) {
            setCheckoutOk(false);
          }
        }
      });
    }
  }, []);

  const handleSetQuantity = (e: SelectChangeEvent<number>, id: string) => {
    const quantity = Number(e.target.value);
    dispatch(changeQuantity({ id, quantity }));
  };

  const handleRemoveProduct = (id: string) => {
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

    dispatch(deleteProduct(id));
  };

  const handleTotal = () => {
    const total = productsInCart
      .reduce((acc, product) => {
        if (product.stock > 0) return acc + product.quantity * product.price;
        return acc;
      }, 0)
      .toFixed(2);

    setTotal(Number(total));
  };

  const renderStock = (stock: number) => {
    const items = [];

    if (stock > 5) stock = 5;

    for (let i = 1; i <= stock; i++) {
      items.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>,
      );
    }

    return items;
  };

  return (
    <div className='ShoppingCart_contain'>
      {/* 
          <div className='ShoppingCart_title'>
            <h1>Shopping Cart</h1>
          </div>
        */}

      <div className='ShoppingCart_info'>
        <div className='ShoppingCart_items-container'>
          <div className='ShoppingCart_items-titles'>
            <div>PRODUCT</div>
            <div>QUANTITY</div>
            <div>PRICE</div>
          </div>
          <div className='ShoppingCart_items'>
            {productsInCart?.map((ele: ProductCart) => {
              return (
                <div key={ele._id} className='ShoppingCart_item-wrapper'>
                  <div className='ShoppingCart_image'>
                    <img src={ele.images[0]} alt={ele.name} />
                  </div>
                  <div className='ShoppingCart_description'>
                    <p className='ShoppingCart_name'>{ele.name}</p>
                    <p className='ShoppingCart_category'>Category: {ele.categories.name}</p>
                    <p className='ShoppingCart_brand'>Brand: {ele.brand}</p>
                  </div>
                  <div className='ShoppingCart_quantity-container'>
                    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                      <CssBaseline />
                      {ele.stock > 0 ? (
                        <FormControl fullWidth>
                          <InputLabel id='id_quantity'>Quantity</InputLabel>
                          <Select
                            labelId='id_quantity'
                            id='demo-simple-select'
                            value={ele.quantity}
                            label='Quantity'
                            onChange={(e) => handleSetQuantity(e, ele._id)}
                          >
                            {renderStock(ele.stock)}
                          </Select>
                        </FormControl>
                      ) : (
                        <p>Out of Stock</p>
                      )}
                    </ThemeProvider>
                  </div>
                  <div className='ShoppingCart_price'>
                    <p>${(ele.price * ele.quantity).toFixed(2)}</p>
                  </div>
                  <div className='ShoppingCart_button-remove'>
                    <button onClick={() => handleRemoveProduct(ele._id)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='ShoppingCart_purchases'>
          <div className='ShoppingCart_total_amount'>
            <div className='ShoppingCart_totalContainerTitle'>
              <h1>Summary</h1>
            </div>
            <hr />
            <div className='ShoppingCart_totalContainer'>
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <div className='ShoppingCart_totalContainer'>
              <p>Discount</p>
              <p>$0</p>
            </div>
            <div className='ShoppingCart_totalContainer'>
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>
          <div className='ShoppingCart_confirm-button'>
            <Link to={`/checkout`}>
              <button
                disabled={!checkoutOk}
                style={
                  !checkoutOk
                    ? {
                        cursor: 'no-drop',
                        color: 'rgba(20, 20, 20, 0.8)',
                        backgroundColor: 'rgba(229, 229, 229, 1)',
                      }
                    : {}
                }
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
      {((!user?.email_verified && !userByBd?.email_verified) || !isAuthenticated) && <ModalCart />}
    </div>
  );
};

export default ShoppingCart;
