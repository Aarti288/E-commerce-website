import React from "react";
import { Link } from "react-router-dom";
import bag from "../Assets/shoppingbag.png"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../Features/AuthSlice";
import {toast }from "react-toastify"
  function Navbar(){
    const {cartTotalQuantity}=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const auth=useSelector(state=>state.auth);
      return(
       <nav className="navbar">
        <Link to="/"> <h2>online shop</h2></Link>

        <Link to="/cart"> 
        <div className="nav-bag">
        <img className="bag-img" src={bag}/>
        <span className="bag-quantity"><span>3</span></span>
        </div>
       </Link>
        
        

        {
          auth._id ?  <Logout onClick={()=>{
            dispatch(logoutUser(null))
            toast.warning("YOu have logged out!",{position:"bottom-left"})
          }}>Logout</Logout>:<AuthLinks>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </AuthLinks>
        }
       
       </nav>
      )
  }
  export default Navbar;

  const AuthLinks=styled.div`

  a{
    &:last-child{
      margin-left:2rem;
    }
  }
  
  `



  const Logout=styled.div`
    

    color:white;
    cursor:pointer;


  `