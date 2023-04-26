import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { url ,setHeaders} from "../../Features/api";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Features/CartSlice";


const Product = () => {
    const params=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [product,setProduct]=useState({});


    console.log("product",product);
    useEffect(()=>{
        async function fetchData(){
            try{
                const res=await axios.get(`${url}/products/find/${params.id}`,setHeaders());
               setProduct(res.data);
               console.log(res.data);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();

    });


    const handleAddCart=(product)=>{
        dispatch(addToCart(product));
        navigate("/cart");

    }
    
    return (  
        <>
         {/* product:{params.id} */}
         <ProductContainer>

         <ImageContainer>

            <img src={product.image?.url} alt=""/>
         </ImageContainer>
         <ProductDetails>
            <h2>{product.name}</h2>
            <p><span>Brand:</span>{product.brand}</p>
            <p><span>Description:</span>{product.desc}</p>
            <h3>${product.price}</h3>
            <button className="create-products" onClick={()=>handleAddCart(product)}>Add to cart</button>
         </ProductDetails>
         </ProductContainer>
        </>
    );
}
   
export default Product;


const ProductContainer=styled.div`
    max-width:500px;
    width:100%;
    height:auto;
    display:flex;
    box-shadow:rgba(100,100,111,0.2)0px 7px 29px 0px;
    border-radius:5px;
    padding:2rem;
    margin:auto;
    margin-top:50px;

`


const ImageContainer=styled.div`
    flex:1;
    img{
        width:12rem;
    }
`

const ProductDetails=styled.div`
flex:2 ;
margin-left:2rem;
h3{
    font-size:35px;
}
p span{
    font-weight:bold;
}


`