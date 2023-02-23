import { Slider } from "@mui/material";
import useFilterByPrice from "./hook/useFilterByPrice";

const FilterByPrice: React.FC = () => {

  const [Filters, thumbValue, { handleChange }]: any = useFilterByPrice();

  return (
    <div className='container-inputFilterByPrice'>
      <Slider
        className="price"
        value={[Filters.pricemin, Filters.pricemax]}
        onChange={handleChange}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        step={10}
        min={0}
        max={3000}
        getAriaValueText={thumbValue}
        sx={{
          width: 300,
          color: "gray-ligth",
        }}
      />
    </div>
  );
};

export default FilterByPrice;
