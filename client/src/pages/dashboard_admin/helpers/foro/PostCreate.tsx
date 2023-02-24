import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin';

const PostCreate = () => {
  return (
    <Create title='Create a post'>
        <SimpleForm>
            <TextInput source='title' />
            <TextInput source='content' />
            <TextInput source='image' />
        </SimpleForm>
    </Create>
  )
}

export default PostCreate;