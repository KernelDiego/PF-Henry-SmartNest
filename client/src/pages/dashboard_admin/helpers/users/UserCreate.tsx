import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin';

interface Props {
    id: string;
    name: string;
    email: string;
}

const UserCreate = (props: Props) => {
  return (
    <Create title='Create a  User' {...props}>
        <SimpleForm>
            <TextInput source='userName' />
            <TextInput source='firstName' />
            <TextInput source='lastName' />
            <TextInput source='email' />
            <TextInput source='password' />
            {/* <TextInput source='role' /> */}
        </SimpleForm>
    </Create>
  )
}

export default UserCreate;