import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, ReferenceField } from 'react-admin';

interface Props {
  id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  isActive: boolean;
  categories: string[];
}

const ProductList = (props: Props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='name' />
        <TextField source='price' />
        <TextField source='stock' />
        <TextField source='categories' />
        <TextField source='isActive' />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment
            @ts-ignore */}
        {/* para que no tire errores le ponemos resource en vez de basePath */}
        <EditButton resource='products' />

        <DeleteButton resource='products' />
      </Datagrid>
    </List>
  );
};

export default ProductList;
