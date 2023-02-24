import React from 'react';
import { Link } from 'react-router-dom';
// Hooks
import { useFavoritesModal } from './hooks/useFavoritesModal';
// Interface
import { Props } from './interface/iFavoritesModal' 
// MUI
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

const favoritesModal: React.FC<Props> = ({ closeModal, favorites, user_id }) => {
  const {
    dark,
    productsInCart,
    handleAddCart,
    handleRemoveCart,
    handleRemoveFavorite,
  } = useFavoritesModal({ favorites, user_id });

  return (
    <div className='ModalFavorite_Overlay'>
      <div className='ModalFavorite_Container'>
        <div className='ModalFavorite_H2_and_x'>
          <h2>My Favorites</h2>
          <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <CssBaseline />

            <IconButton size='large' onClick={() => closeModal(false)}>
              <CloseIcon />
            </IconButton>
          </ThemeProvider>
        </div>

        {favorites.length ? (
          favorites.map((favorite) => (
       
            <div className='ModelFavorite_Item-Container' key={favorite._id}>
              <div className='ModalFavorite_TitleContainer'>{favorite.name}</div>
              <div className='ModalFavorite-Grid'>
                <div className='ModalFavorite_Image'>
                  <Link to={`/product/${favorite._id}`}>
                    <img src={favorite.images[0]} alt={favorite.name} />
                  </Link>
                </div>

                <div className='ModalFavorite_info'>
                  <p>Brand: {favorite.brand}</p>
                  <p>$ {favorite.price.toFixed(2)}</p>
                  <div className='ModalFavorite_info_buttons'>
                    {favorite.stock > 0 && !productsInCart.find((el) => el._id === favorite._id) ? (
                      <div className='add-car-card-beta' onClick={() => handleAddCart(favorite)}>
                        <IconButton color='primary'>
                          <AddShoppingCartIcon />
                        </IconButton>
                      </div>
                    ) : favorite.stock > 0 &&
                      productsInCart.find((el) => el._id === favorite._id) ? (
                      <div className='add-car-card-beta' onClick={() => handleRemoveCart(favorite)}>
                        <IconButton color='error'>
                          <RemoveShoppingCartIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <div className='add-car-card-beta'>
                        <button disabled>out of Stock</button>
                      </div>
                    )}
                    <IconButton color='error' onClick={() => handleRemoveFavorite(favorite)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>You have no favorites yet</div>
        )}
      </div>
    </div>
  );
};

export default favoritesModal;
