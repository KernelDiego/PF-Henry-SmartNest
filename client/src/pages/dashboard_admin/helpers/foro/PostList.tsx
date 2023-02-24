import React from 'react'
import { List, Datagrid, TextField, EditButton, DeleteButton, ReferenceField } from 'react-admin';


const PostList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source='id' />
        <TextField source='title' />
        <TextField source='likes' />
        <TextField source='author' />
        <TextField source='deleted' />
        <EditButton resource='/posts' />

        <DeleteButton resource='posts' />
      </Datagrid>
    </List>
  )
}

export default PostList;