const { getModelForClass } = require('@typegoose/typegoose');
const { Product } = require('../../models/Product');
const ProductModel = getModelForClass(Product);

const obj = [
  { name: 'Connectify and Control', id: '63bebb1fe29c7344a53f6c29' },
  { name: 'Home Entertainment', id: '63bebc3e001d5278f72b9266' },
  { name: 'Energy Management', id: '63bebc4e001d5278f72b9268' },
  { name: 'Safety and Security', id: '63bebc5f001d5278f72b926a' },
  { name: 'Confort and Ease', id: '63bebc6c001d5278f72b926c' },
  { name: 'Lifestyle and Health', id: '63c6d27b2fbbfb7b7911edf2' },
];

export const allProductsQuantity = async () => {
  const promisesObj = obj.map((category) =>
    ProductModel.find({
      categories: category.id,
    }).populate({
      path: 'categories',
      select: '-__v',
    }),
  );

  return await Promise.all(promisesObj).then((resp) =>
    resp.map((res) => {
      return {
        name: (Object.entries(res)[0][1] as { categories: { name: string; _id: string } })?.categories.name,
        id: (Object.entries(res)[0][1] as { categories: { name: string; _id: string } }).categories._id,
        quantity: res.length as number,
      };
    }),
  );
};
