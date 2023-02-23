import { Rating } from "@mui/material";
import useFilterByRating from "./hook/useFilterByRating";

const FilterByRating: React.FC<{}> = () => {

  const [Filters, { handlerChange }]: any = useFilterByRating();

  return (
    <div className='container'>
      <Rating
        size='medium'
        className='component-rating'
        name='half-rating'
        defaultValue={Filters.rating}
        precision={0.5}
        onClick={handlerChange}
      />
    </div>
  );
};

export default FilterByRating;
