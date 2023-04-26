import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { removecart,clearCart, getCartTotal } from "../Features/CartSlice";

  function Cart(){
    const cart=useSelector((state)=>state.cart);
    const dispatch=useDispatch();


    useEffect(()=>{
      dispatch(getCartTotal())
    },[cart,dispatch])
    const  handleRemovecart=((cartItem)=>{
      dispatch(removecart(cartItem))
    })


    const handleremoveAllCrt=(()=>{
      dispatch(clearCart())
    })
      return(
       <div className="cart-container">
        <h2>Cart Data</h2>
        {
          cart.cartItems.length===0 ?(
            <div className="cart-empty">
             
              <p>your cart is currently empty</p>
              <h3>oops! you don't have cart for shopping</h3>
              
             
            </div>
           
            

          ):(
          <div>
            <div className="titles">
              <h3 className="product-title">product</h3>
              <h3 className="price">price</h3>
              
              <h3 className="total">total</h3>
            </div>

           <div className="cart-items">
            {cart.cartItems?.map(cartItem=>(
              <div className="cart-item" key={cartItem._id}>
                <div className="cart-product">
                  <img src={cartItem.image.url} alt={cartItem.name}/>
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={()=> handleRemovecart(cartItem)}>Remove</button>
                  </div>
                </div>
                 <div className="cart-product-price">${cartItem.price}</div>
                 <div className="cart-product-total-price">${cartItem.price}</div>
              </div>
            ))}
           </div>
           <div className="cart-summary">
            <div>
            <button onClick={()=>handleremoveAllCrt()} className="clear-cart">Cancel all</button>
            </div>

            <div className="continue-shopping">
            <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
              <span>Back</span>
            </Link>
          
          </div>
           </div>

          </div>
        )}
           <div className="continue-shopping">
            <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
              <span>continue shopping</span>
            </Link>
          
          </div>
       </div>
      );
  }
  export default Cart;