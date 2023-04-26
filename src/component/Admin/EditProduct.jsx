import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import { productCreate } from '../../Features/ProductSlice';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productUpdate } from '../../Features/ProductSlice';

function EditProduct({productID}) {
    const {items,editStatus}=useSelector((state)=>state.products)
    const dispatch=useDispatch();

    const [currentProd,setCurrentProd]=useState({})
    const [previewImg,setpreviewImg]=useState("")
  const [productImg,setProductImg]=useState("")
  const [name,setName]=useState("")
  const [brand,setBrand]=useState("")
  const [price,setPrice]=useState("")
  const [desc,setDesc]=useState("")
 

 



//  console.log(productImg);

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
                setpreviewImg(reader.result);
            }
        }
        else{
            setProductImg("")
        }

    }
    const handleSubmit=(e)=>{
        e.preventDefault();

        dispatch(productUpdate({
           productImg,
           product:{
               ...currentProd,
               name:name,
               brand:brand ,
               desc:desc,
               price:price
           }
        }))



    }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

    let seclectedProd=items.filter((item)=>item._id===productID)
    seclectedProd=seclectedProd[0];
    setCurrentProd(seclectedProd);
    setpreviewImg(seclectedProd.image.url);
    setProductImg("");
    setBrand(seclectedProd.brand);
    setName(seclectedProd.name)
    setPrice(seclectedProd.price)
    setDesc(seclectedProd.desc)
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>
       Edit
      </Edit>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
        <StyledEditProduct>
        <StyledForm onSubmit={handleSubmit}>
            <h3>Edit a product</h3>
            <input type="file"  accept="image/" onChange={handleproductImageUpload}/>
            <input type="text" value={name} required placeholder="Enter the product name" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" value={price} required placeholder="Enter the price" onChange={(e)=>setPrice(e.target.value)}/>
            <input type="text" value={desc} required placeholder="Give description about product" onChange={(e)=>setDesc(e.target.value)}/>
            <input type="text" value={brand} required placeholder="Enter the brand name" onChange={(e)=>setBrand(e.target.value)}/>
             <button className="product-submit">{editStatus==="pending"?"submitting" :"submit"}</button>
        </StyledForm>
         <ImagePreview>
            {previewImg ?<>
            <img className="product-img" src={previewImg} alt="product img"/>
            </>:" "}
         </ImagePreview>
       </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default  EditProduct;

const Edit=styled.button`
  background-color:#4b70e2;
  border:none;
  outline:none;
  cursor:pointer;
`;

const StyledForm = styled.form`
  /* display: flex;
  flex-direction: column; */
  max-width: 300px;
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

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
  width:40vw;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 500px;
  width: 50%;
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


