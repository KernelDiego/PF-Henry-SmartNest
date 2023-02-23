import { useAppDispatch } from "../../../../../Redux/hook";
import { updateCategoryFilter } from "../../../../../Redux/slice/product/product.slice";

const useFilterByCategory = () => {
  const dispatch = useAppDispatch();

  const handlerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateCategoryFilter(event.target.value));
  };

  return { handlerChange }
};

export default useFilterByCategory;
