import { getModelForClass } from "@typegoose/typegoose";
import { Product } from "../../models/Product";
import { filterRange, filterPrice } from "./filterRange";
import { allProductsCategories } from "./allProductsCategories";
import { orderProducts } from "../order/orderProducts";
import { nameProduct } from "../../helpers/filter/nameProduct";

const ProductModel = getModelForClass(Product);

export const allFilters = async (query: any) => {
  const { filter, order } = query;
  let products;

  if (filter) {
    if (filter.categories && filter.categories.length) {
      products = await ProductModel.find({
        categories: filter.categories,
      }).populate({
        path: "categories",
        select: "-__v",
      });
    } else products = await allProductsCategories();

    if (filter.name && filter.name !== "") 
      products = nameProduct(products, filter.name);

    if (filter.rating && products && filter.rating !== "")
      products = filterRange(products, filter.rating, "rating");
    if (
      (filter.pricemin && products && filter.pricemin != 0) ||
      (filter.pricemax && products && filter.pricemax != 0)
    )
      products = filterPrice(
        products,
        filter.pricemin,
        filter.pricemax,
        "price"
      );
    if (filter.stock && products && filter.stock.length)
      products = filterRange(products, filter.stock, "stock");
  } else products = await allProductsCategories()

  if (order && products) products = orderProducts(products, order)
  
  return products;
};
