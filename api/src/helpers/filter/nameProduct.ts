export const nameProduct = (products, name) =>
  products.filter(produc => produc.name.toLowerCase().includes(name.toLowerCase()));

