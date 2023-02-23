import React from "react";
interface FilterByProps {
  closeItem: (e: string) => void;
  filter: string;
}

const ItemFilter: React.FC<FilterByProps> = ({ filter, closeItem }) => {
  return (
    <div className='container-itemFilter'>
      <div className='name-filter'>{filter}</div>
      <button className='close-item' onClick={() => closeItem(filter)}>
        x
      </button>
    </div>
  );
};

export default ItemFilter;
