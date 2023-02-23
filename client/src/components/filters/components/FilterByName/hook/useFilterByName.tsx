import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import { getProductName, ProductState } from "../../../../../Redux/slice/product/product.slice";
import { FilterState, getProduct } from "../../../../../Redux/slice/product/product.slice";
import { productsFilter } from "../../../../../Redux/slice/product/ProductController";

const useFilterByName = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useAppDispatch();

  const Product: ProductState[] = useAppSelector(
    state => state.productReducer.Products
  );

  const Filters: FilterState = useAppSelector(
    state => state.productReducer.Filters
  );

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getProductName(e.target.value));

    const filteredSuggestions = Product?.filter(el => {
      const searchTerm = e.target.value.toLocaleLowerCase();
      const prodName = el.name.toLocaleLowerCase();
      return (
        searchTerm && prodName.includes(searchTerm) && prodName !== searchTerm
      );
    })
      .slice(0, 5)
      .map(el => el.name);

    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    productsFilter(Filters)?.then(response => {
      dispatch(getProduct(response));
    });

    dispatch(getProductName(""));
    setShowSuggestions(false);
  };

  return [Filters, Product, suggestions, showSuggestions, { handleName, handlerSubmit, dispatch, getProductName } ];
};

export default useFilterByName;
