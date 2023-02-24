import React from 'react'
import { Edit, SimpleForm, TextInput, ReferenceInput } from 'react-admin';

interface Props{
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

const ProductEdit = (props: Props) => {
  return (
    <Edit title='Edit Product' {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput disabled source='id' />
            <TextInput source='name' />
            <TextInput source='price' />
            <TextInput multiline rows={5} source='description' />
            <TextInput source='brand' />
            <TextInput source='images' />
            <TextInput source='stock' />
            <TextInput source='rating' />
            <TextInput source='categories' />
        </SimpleForm>
    </Edit>
  )
}

export default ProductEdit;