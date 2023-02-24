import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

interface Props {
  id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  categories: string[];
}

const ProductCreate = (props: Props) => {
  return (
    <Create title='Create a  Product' {...props}>
      <SimpleForm>
        <TextInput source='name' />
        <TextInput source='price' />
        <TextInput source='description' />
        <TextInput source='brand' />
        <TextInput source='images' />
        <TextInput source='stock' />
        <TextInput source='rating' />
        <TextInput source='categories' />
      </SimpleForm>
    </Create>
  );
};

export default ProductCreate;
