import { ProductState } from "../../../../../Redux/slice/product/product.slice";

export interface Props {
  closeModal: Function;
  favorites: ProductState[];
  user_id: string;
}
