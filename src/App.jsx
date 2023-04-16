
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

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/cart" exact element={<Cart/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route path="/pagenotfound" element={<PageNotFound/>}/>
        
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
