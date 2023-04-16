
import React from "react";
import {useNavigate} from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../Features/ProductsApi";
import { addToCart } from "../Features/CartSlice";
  function Home(){
   
   const {items : products,status}=useSelector((state)=>state.products);

  //  const auth=useSelector((state)=>state.auth);
 
  //  console.log(auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {data,error,isLoading}=useGetAllProductsQuery()

  
    const handleaddTocart=(product)=>{
       dispatch(addToCart(product))
       navigate("/cart")
    } 
      return(
        <div className="home-container">
          {
            isLoading ?(  <span>Loading...</span>):error?(<span>An error occured</span>):(
            <>
            <h2>New Data</h2>
            <div className="products">
              {data?.map(product=>(<div key={product.id} className="product">

                <h3>{product.name}</h3>
                <img className="product-img" src={product.image} alt={product.name}/>
                <div className="desc">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={()=>handleaddTocart(product)}>Add to cart</button>
              </div>
                ))}
            </div>
            </>
          )}
        </div>
      )
  }
  export default Home;