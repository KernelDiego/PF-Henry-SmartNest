import { ProductState } from "../../../../../Redux/slice/product/product.slice";
import { toast, Zoom } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import { addProduct, deleteProduct } from "../../../../../Redux/slice/shoppingCart/shoppingCart.slice";
import { ProductCart } from "../../../../../Redux/slice/shoppingCart/shoppingCart.slice";
import { addFavorite } from "../../../../../Redux/slice/user/user.slice";
import { addFavoriteFetch } from "../../../../../Redux/slice/user/userController";

interface HookProps {
  favorites: ProductState[];
  user_id: string;
}

interface HookReturnType {}

export const useFavoritesModal = ({ favorites, user_id }: HookProps) => {
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(state => state.cartReducer.Products);

  const dark: boolean = useAppSelector(state => state.themeReducer.dark);

  const handleRemoveFavorite = async (product: ProductState) => {
    const favoritesUpdated: ProductState[] = favorites.filter(
      (favorite: ProductState) => favorite._id !== product._id
    );

    const userUpdate = await addFavoriteFetch(
      user_id,
      product,
      favoritesUpdated
    );
    dispatch(addFavorite(userUpdate.favorites));

    toast.error("Product removed from favorites", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

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

    toast.success("Product added to Cart", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });

    dispatch(addProduct(productCart));
  };

  const handleRemoveCart = (product: ProductState) => {
    dispatch(deleteProduct(product._id));
    toast.error("Product removed from Cart", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  return {
    dark,
    productsInCart,
    handleAddCart,
    handleRemoveCart,
    handleRemoveFavorite,
  };
};
