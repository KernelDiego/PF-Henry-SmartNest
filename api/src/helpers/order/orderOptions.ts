export const orderOptions = {
  stringup: (products, type) => products.sort((a, b) => a[type].localeCompare(b[type])),
  stringdown: (products, type) => products.sort((a, b) => b[type].localeCompare(a[type])),
  up: (products, type) => products.sort((a, b) => b[type] - a[type]),
  down: (products, type) => products.sort((a, b) => a[type] - b[type]),
  default: products => products,
}
