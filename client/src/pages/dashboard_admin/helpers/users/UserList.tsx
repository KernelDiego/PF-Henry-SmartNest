import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

interface Props {
  id: string;
  userName: string;
  email: string;
  isActive: boolean;
}

const UserList = (props: Props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='_id' />
        <TextField source='userName' />
        <EmailField source='email' />
        <TextField source='isActive' />

        {/* para que no tire errores le ponemos resource en vez de basePath */}
        <EditButton resource='users' />

        <DeleteButton resource='users' />
      </Datagrid>
    </List>
  );
};

export default UserList;
