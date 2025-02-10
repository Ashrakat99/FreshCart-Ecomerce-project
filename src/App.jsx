
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import UserContextProvider from './context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './context/CartContext.jsx'
import WishList from './Components/WishList/WishList.jsx'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress.jsx'
import Allorders from './Components/allOrders/allOrders.jsx'


let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {path:'Register' , element: <Register/>},
    {path:'login' , element: <Login/>},
    {path:'ForgotPassword' , element: <ForgotPassword/>},
    {path:'ResetPassword' , element: <ResetPassword/>},
    {path:'Home' , index: true , element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'Wishlist' , element: <ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'brands' , element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'categories' , element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'ProductDetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'ShippingAddress/:id' , element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
    {path:'AllOrders' , element: <ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'*' , element: <NotFound/>},
  ]
}])
function App() {

  return <>
    <CartContextProvider>
    <UserContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </UserContextProvider>
    </CartContextProvider>
  </>
}

export default App
