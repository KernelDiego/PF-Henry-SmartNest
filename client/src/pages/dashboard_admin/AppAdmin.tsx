import { Admin, Resource, Layout } from 'react-admin';
import UserIcon from '@mui/icons-material/Group';
// MUI
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PaidIcon from '@mui/icons-material/Paid';
// Products Helpers
import ProductList from "./helpers/products/ProductList";
import ProductCreate from "./helpers/products/ProductCreate";
import ProductEdit from "./helpers/products/ProductEdit";
// Users Helpers
import UserList from './helpers/users/UserList';
import UserCreate from './helpers/users/UserCreate';
import UserEdit from './helpers/users/UserEdit';
// Posts Helpers
import PostList from './helpers/foro/PostList';
import PostCreate from "./helpers/foro/PostCreate";
import PostEdit from "./helpers/foro/PostEdit";

import PurchaseList from './PurchaseList';
import { Dashboard } from './Dashboard/Dashboard';
import { MyAppBar } from './MyAppBar';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dataProvider from './dataProvider';

const MyLayout = (props: any) => (
  <Layout {...props} appBar={MyAppBar}  />
);

const AppAdmin = () => {
  return (
    <div>
      <Admin basename='/admin' dataProvider={dataProvider} dashboard={Dashboard} layout={MyLayout}>
        <Resource
          name='users'
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          icon={UserIcon}
        />
        <Resource
          name='products'
          list={ProductList}
          edit={ProductEdit}
          create={ProductCreate}
          icon={LocalGroceryStoreIcon}
        />
        <Resource name='purchases' list={PurchaseList} icon={PaidIcon} />
        <Resource
          name='posts'
          list={PostList}
          create={PostCreate}
          edit={PostEdit}
          icon={TextSnippetIcon}
        />
      </Admin>
    </div>
  );
};

export default AppAdmin;
