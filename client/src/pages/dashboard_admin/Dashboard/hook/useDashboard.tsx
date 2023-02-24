import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook.js";
import { ProductQuantityState, getCategoryQuantity } from "../../../../Redux/slice/product/product.slice";
import { productQuantity } from "../../../../Redux/slice/product/ProductController";
import { API_URL } from "../../../../../config";

export const useDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [purchasesCount, setPurchasesCount] = useState(0);
  const [payments, setPayments] = useState([]);

  const dispatch = useAppDispatch();

  const CategoryQuantity: ProductQuantityState[] = useAppSelector(
    state => state.productReducer.CategoryQuantity
  );

  useEffect(() => {
    const fetchData = async () => {
      setUsersCount(
        await fetch(`${API_URL}/users`).then(res =>
          res.json().then(respon => respon.length)
        )
      );
      setProductsCount(
        await fetch(`${API_URL}/products`).then(res =>
          res.json().then(respon => respon.length)
        )
      );
      setPurchasesCount(
        await fetch(`${API_URL}/checkout`).then(res =>
          res.json().then(respon => respon.length)
        )
      );
      setPayments(
        await fetch(`${API_URL}/checkout/date`).then(res => res.json())
      );
    };
    fetchData();

    productQuantity()?.then(response => {
      dispatch(getCategoryQuantity(response));
    });
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#c30101",
  ];

  return [
    usersCount,
    productsCount,
    purchasesCount,
    CategoryQuantity,
    COLORS,
    payments,
  ];

  
}