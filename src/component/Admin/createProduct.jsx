import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productCreate } from "../../Features/ProductSlice";
const CreateProduct = () => {


    const dispatch=useDispatch();
  const [productImg,setProductImg]=useState("")
  const [name,setName]=useState("")
  const [brand,setBrand]=useState("")
  const [price,setPrice]=useState("")
  const [desc,setDesc]=useState("")
 

 



 console.log(productImg);

    const handleproductImageUpload=(e)=>{
        const file=e.target.files[0];
        console.log(file)
        TransformFile(file)
    }


    const TransformFile=(file)=>{

        const reader= new FileReader()

        if(file)
        {
            reader.readAsDataURL(file)
            reader.onloadend=()=>{
                setProductImg(reader.result);
            }
        }
        else{
            setProductImg("")
        }

    }
    const handleSubmit=(e)=>{
        e.preventDefault();

        dispatch(productCreate({
            name,
            brand,
            price,
            desc,
            image:productImg
        }))



    }
    return ( 
       <StyledCreateProduct>
        <StyledForm onSubmit={handleSubmit}>
            <h3>Create a product</h3>
            <input type="file"  accept="image/" onChange={handleproductImageUpload} required/>
            <input type="text" required placeholder="Enter the product name" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" required placeholder="Enter the price" onChange={(e)=>setPrice(e.target.value)}/>
            <input type="text" required placeholder="Give description about product" onChange={(e)=>setDesc(e.target.value)}/>
            <input type="text" required placeholder="Enter the brand name" onChange={(e)=>setBrand(e.target.value)}/>
             <button className="product-submit">Submit</button>
        </StyledForm>
         <ImagePreview>
            {productImg ?<>
            <img className="product-img" src={productImg} alt="product img"/>
            </>:" "}
         </ImagePreview>
       </StyledCreateProduct>
     );
}
 
export default CreateProduct;

const StyledForm = styled.form`
  /* display: flex;
  flex-direction: column; */
  max-width: 600px;
  margin-top: 2rem;
  
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    width:100%;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
 
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
  width:70vw;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  float:right;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;


