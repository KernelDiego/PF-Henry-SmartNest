import React from "react";
import { Link } from "react-router-dom";
import useFilterByName from "./hook/useFilterByName";
import icon from "../../../../assets/images/icons/search_icon_w.png";

const FilterByName: React.FC<{}> = () => {
  const [
    Filters,
    Product,
    suggestions,
    showSuggestions,
    { handleName, handlerSubmit, dispatch, getProductName },
  ]: any = useFilterByName();

  return (
    <form className='new-container-filterBy-c' onSubmit={handlerSubmit}>
      <div className='input'>
        <input
          className='input-filterByName'
          type='text'
          id='inputName'
          value={Filters.name}
          placeholder='Search...'
          onChange={e => handleName(e)}
        />

        <button className='🔍' type='submit'>
          <img className='img-btn' src={icon} alt='icon' />
        </button>
      </div>

      {showSuggestions && (
        <select className='suggestions-dropdown'>
          {suggestions.slice(0, 5).map((el: string) => (
            <Link
              className='link'
              to={`/product/${Product.find((p: any) => p.name === el)?._id}`}
            >
              <div
                className='suggestion-row'
                onClick={() => dispatch(getProductName(el))}
              >
                {el.slice(0, 20)} ...
              </div>
            </Link>
          ))}
        </select>
      )}
    </form>
  );
};

export default FilterByName;
