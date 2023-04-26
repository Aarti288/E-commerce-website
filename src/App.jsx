
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {BrowserRouter,Route ,Routes} from "react-router-dom";
import Navbar from './component/Navbar';
import Cart from './component/Cart';
import Home from './component/home';
import Login from './component/UserAuth/login';
import Register from './component/UserAuth/register';
import PageNotFound from './component/PageNotFound';
import Dashboard from './component/Admin/dashboard';
import Product from './component/Admin/product';
import Summary from './component/Admin/summary';
import CreateProduct from './component/Admin/createProduct';
import ProductView from './component/ProductList/product';
import User from './component/ProductList/user';

import { ToastContainer } from 'react-toastify';
import ProductsList from './component/AllProducts/Productlist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
      <Navbar />
      <Routes>
      <Route path="/cart" exact element={<Cart/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductView/>}></Route>
        <Route path="/user/:id" element={<User/>}></Route>
        <Route exact path="/admin" element={<Dashboard/>}>
        
       
        <Route exact path="product" element={<Product/>}/>
        <Route exact path="summary" element={<Summary/>}/>
        <Route exact path="product" element={<Product/>}>
          <Route index element ={<ProductsList/>}/>
        <Route path="createproduct" element={<CreateProduct/>}/>
        </Route>

        </Route>

        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route path="/pagenotfound" element={<PageNotFound/>}/>
        
        
        
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
