import { Request, Response } from "express";
import { allFilters } from "../../helpers/filter/allFilters";
import { allProductsCategories } from "../../helpers/filter/allProductsCategories";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    if (req.query) {
      const products = await allFilters(req.query);
      return products?.length
        ? res.json(products)
        : res.status(404).json({ error: "product not found" });
    }
    
    let products = await allProductsCategories();
    return res.status(200).json(products);

  } catch (error) {
    return res.status(400).json({ message: "Error getting product", error });
  }
};
