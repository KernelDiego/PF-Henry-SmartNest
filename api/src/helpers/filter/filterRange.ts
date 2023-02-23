export const filterRange = (products, query, name) =>
  products.filter(pr => pr[name] >= query);

export const filterPrice = (products, min, max, name) =>
  products.filter(pr => pr[name] >= min && pr[name] <= max)

