import { updatePriceMinFilter, updatePriceMaxFilter, FilterState } from "../../../../../Redux/slice/product/product.slice";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";

const useFilterByPrice = () => {
  const dispatch = useAppDispatch();

  const Filters: FilterState = useAppSelector(
    state => state.productReducer.Filters
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number | number[]) => {
    const [pricemin, pricemax] = newValue as number[];
    dispatch(updatePriceMinFilter(pricemin));
    dispatch(updatePriceMaxFilter(pricemax));
  };

  const thumbValue = (value: number) => `$ ${value}`;

  return [ Filters, thumbValue, { handleChange } ]
};

export default useFilterByPrice;
