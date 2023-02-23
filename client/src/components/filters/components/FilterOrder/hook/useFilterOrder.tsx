import { useAppDispatch } from "../../../../../Redux/hook";
import { updateOrderFilter } from "../../../../../Redux/slice/product/product.slice";

const useFilterOrder = () => {
  const dispatch = useAppDispatch();

  const handlerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateOrderFilter(event.target.value));
  };

  return { handlerChange };
};

export default useFilterOrder;
