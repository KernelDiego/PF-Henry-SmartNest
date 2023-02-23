import React from "react";
import ItemFilter from "../ItemFilter/ItemFilter";
import { FilterState } from "../../../../Redux/slice/product/product.slice";

interface FilterByProps {
  filterList: FilterState;
  onCloseListHandler: (e: string) => void;
}

const ItemFilterList: React.FC<FilterByProps> = ({ filterList, onCloseListHandler }) => {
  return (
    <div className='container-ItemFilterList'>
      {Object.values(filterList).map((el, index) => (
        <>
          <ItemFilter key={index} filter={el} closeItem={onCloseListHandler} />
        </>
      ))}
    </div>
  );
};

export default ItemFilterList;
