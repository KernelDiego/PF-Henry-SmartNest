import { orderOptions } from './orderOptions';

export const orderProducts = (products, types:string) => {

  let [type, order] = Object.entries(types)[0];

  return (orderOptions[order.toLowerCase()] || orderOptions.default) (products,type.toLowerCase());
}
