import React, { useRef } from "react";
// Components
import { Card } from "./components/card/Card";
import FiltersPanel from "../../components/filters/FiltersPanel";
import ScrollUp from "../../components/scrollUp/ScrollUp";

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
