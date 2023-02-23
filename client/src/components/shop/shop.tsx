import React, { useRef } from "react";
import FiltersPanel from "../filters/FiltersPanel";
import Breadcrumb from "../BreadCrumb";
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

      <div className='breadcrumb'>
        <div className='base'>
          <Breadcrumb />
        </div>
      </div>
      {/* <ScrollUp refUse={ref} /> */}
    </div>
  );
};

export default Shop;
