import useFilterOrder from "./hook/useFilterOrder";

const FilterOrder: React.FC<{}> = () => {
  const { handlerChange } = useFilterOrder();

  return (
      <div className='new-container-category'>
        <select className="select-category" name='' onChange={handlerChange}>
          <option className="option-categority" value='all'> ---- </option>
          <option className="option-categority" value='[name]=stringup'>A-Z</option>
          <option className="option-categority" value='[name]=stringdown'>Z-A</option>
          <option className="option-categority" value='[price]=up'>Price Up</option>
          <option className="option-categority" value='[price]=down'>Price Down</option>
          <option className="option-categority" value='[rating]=up'>Rating Up</option>
          <option className="option-categority" value='[rating]=down'>Rating Down</option>
          <option className="option-categority" value='[stock]=up'>Stock Up</option>
          <option className="option-categority" value='[stock]=down'>Stock Down</option>
        </select>
      </div>
  );
};

export default FilterOrder;
