import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin';

interface Props {
    id: string;
    name: string;
    email: string;
}

const UserEdit = (props: Props) => {
  console.log(props);
  
  return (
    <Edit title='Edit User' {...props}>
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput source='userName' />
            <TextInput source='firstName' />
            <TextInput source='lastName' />
            <TextInput source='email' />
            <TextInput source='password' />
            <TextInput source='role' />
        </SimpleForm>
    </Edit>
  )
}

export default UserEdit;