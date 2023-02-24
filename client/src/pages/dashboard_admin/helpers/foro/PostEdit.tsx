import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin';

const PostEdit = () => {
  return (
    <Edit title='Edit User'>
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput source='title' />
            <TextInput source='content' />
            <TextInput source='image' />
        </SimpleForm>
    </Edit>
  )
}

export default PostEdit;