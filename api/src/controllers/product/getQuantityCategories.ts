import { Request, Response } from "express";
import { allProductsQuantity } from "../../helpers/filter/allProductsQuantity";

export const getQuantityCategories = async (req: Request, res: Response) => {
  try {
    let products = await allProductsQuantity();

    return products?.length
      ? res.json(products)
      : res.status(404).json({ error: "product not found" });
  } catch (error) {
    return res.status(400).json({ message: "Error getting product", error });
  }
};
