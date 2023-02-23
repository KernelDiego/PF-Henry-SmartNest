import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import { updateRatingFilter, FilterState } from "../../../../../Redux/slice/product/product.slice";

const useFilterByRating = () => {
  const dispatch = useAppDispatch();

  const Filters: FilterState = useAppSelector(
    state => state.productReducer.Filters
  );

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateRatingFilter(event.target.value));
  };

  return [ Filters, { handlerChange } ]
};

export default useFilterByRating;
