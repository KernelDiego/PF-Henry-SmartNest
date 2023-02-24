import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
// Redux
import { useAppDispatch } from "./Redux/hook";
import { addProduct } from "./Redux/slice/shoppingCart/shoppingCart.slice";
import { getUserLogin } from "./Redux/slice/user/user.slice";
import { changeTheme } from "./Redux/slice/theme/theme.slice";
// Components
import Home from './pages/home/Home';
import News from './pages/news/News';
import Shop from './pages/shop/shop'
import NavBar from './components/navbar/Navbar';
import Detail from './pages/details/Detail';
import Footer from './components/footer/Footer';
import { About } from "./pages/about/About";
import { Dashboard_user } from './pages/dashboard_user/Dashboard_user';
import AppAdmin from './pages/dashboard_admin/AppAdmin';
import ShoppingCart from './pages/checkout/ShoppingCart';
import Form from './pages/checkout/FormComponent';
import { Foro_Profile } from "./pages/foro/components/Foro_Profile/Foro_Profile";
import ForoHome from './pages/foro/ForoHome/foroHome';
import Page404 from "./pages/page404/page404";
// CSS
import "react-toastify/dist/ReactToastify.css";


function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const productsInLS = JSON.parse(localStorage.getItem('shoppingCart') as string) ?? [];

    if (productsInLS.length) {
      dispatch(addProduct(productsInLS));
    }

    const darkInLS = JSON.parse(localStorage.getItem('dark') as any) ?? false;

    if (darkInLS === true || darkInLS === false) {
      dispatch(changeTheme(darkInLS));
    }

    if (isAuthenticated) {
      const userInLS = JSON.parse(localStorage.getItem('userByBd') as string) ?? {};
      dispatch(getUserLogin(userInLS));
    }
  }, [isAuthenticated]);

  return (
    <>
      <ToastContainer />
      {!['/admin'].some((path) => location.pathname.startsWith(path)) && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' />
        <Route path='/shop' element={<Shop />} />
        <Route path='/news' element={<News />} />
        <Route path='/profile' element={<Dashboard_user />} />
        <Route path='/product/:id' element={<Detail />} />
        <Route path='/admin/*' element={<AppAdmin />} />
        <Route path='/shopping_cart' element={<ShoppingCart />} />
        <Route path='/checkout' element={<Form />} />
        <Route path='/foro' element={<ForoHome />} />
        <Route path='*' element={<Page404 />} />
        <Route path='/foro/profile/:id' element={<Foro_Profile />} />
      </Routes>

      {!location.pathname.includes('foro') && !location.pathname.includes('admin') && <Footer />}
    </>
  );
}

export default App;
