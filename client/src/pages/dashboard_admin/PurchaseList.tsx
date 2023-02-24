import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
} from 'react-admin';

const PurchaseList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source='id' />
        <TextField source='Payer' />
        <TextField source='Products' />
        <TextField source='Date_of_Purcharse' />
        <TextField source='Status' />
        <TextField source='Status_Detail' />
        <TextField source='Total_Paid' />
        
        {/* para que no tire errores le ponemos resource en vez de basePath */}
        <DeleteButton resource='purchases' />
      </Datagrid>
    </List>
  );
};

export default PurchaseList;
