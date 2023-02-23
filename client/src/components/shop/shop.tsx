import React, { useRef } from "react";
import FiltersPanel from "../filters/FiltersPanel";
import Card from "../card/CardBeta";
import ScrollUp from "../scrollUp/ScrollUp";

const Shop: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className='content-shop'>
      <div className='shop-contain'>
        <FiltersPanel />
        <Card />
        <ScrollUp refUse={ref} />
      </div>
      {/* <ScrollUp refUse={ref} /> */}
    </div>
  );
};

export default Shop;
