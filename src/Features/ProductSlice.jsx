import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import { setHeaders, url } from "./api";

const initialState={
    items:[],
    status:null,
    createStatus:null,
    deleteStatus:null,
    updateStatus:null,

};

export const productFetch=createAsyncThunk(
    "products/productFetch",
    async()=>{
   
    const response= await axios.get(`${url}/products`);
    return response?.data
  
       
    }
)

export const productCreate=createAsyncThunk(
    "products/productCreate",
    async(values)=>{
   try{
    const response= await axios.post(`${url}/products`,values,setHeaders());
    return response?.data
   }
   catch(error){
     toast.error(error.response?.data)
   }
  
       
    }
)



export const productUpdate=createAsyncThunk(
    "products/productUpdate",
    async(values)=>{
   try{
    const response= await axios.put(`${url}/products/${values.product._id}`,values,setHeaders());
    return response?.data
   }
   catch(error){
     toast.error(error.response?.data)
   }
  
       
    }
)


export const productDelete=createAsyncThunk(
    "products/productDelete",
    async(id)=>{
   try{
    const response= await axios.delete(`${url}/products/${id}`,setHeaders());
    return response?.data
   }
   catch(error){
     toast.error(error.response?.data)
   }
  
       
    }
)

const ProductSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:  
    {
        [productFetch.pending]:(state,action)=>{
            state.status="pending"
        },
        [productFetch.fulfilled]:(state,action)=>{
            state.status="success"
            state.items=action.payload
        },
        [productFetch.rejected]:(state,action)=>{
            state.status="rejected"
           
           
        },
    

    [productCreate.pending]:(state,action)=>{
        state.createStatus="pending"
    },
    [productCreate.fulfilled]:(state,action)=>{
        state.items.push(action.payload);   
        state.createStatus="success"
        toast.success("Product created");
    },
    [productCreate.rejected]:(state,action)=>{
        state.createStatus="rejected"
       
       
    },




    [productUpdate.pending]:(state,action)=>{
        state.updateStatus="pending"
    },
    [productUpdate.fulfilled]:(state,action)=>{
         const updatedPro=state.items.map((product)=>product._id===action.payload._id ? action.paylaod:product)
         state.items=updatedPro;
        state.updateStatus="success"
        toast.success("Product updated");
    },
    [productUpdate.rejected]:(state,action)=>{
        state.updateStatus="rejected"
       
       
    },

    [productDelete.pending]:(state,action)=>{
        state.deleteStatus="pending"
    },
    [productDelete.fulfilled]:(state,action)=>{
          const newList=state.items.filter((item)=> item._id!==action.payload._id)
          state.items=[...newList];
        state.deleteStatus="success"
        toast.error("Product deleted");
    },
    [productDelete.rejected]:(state,action)=>{
        state.deleteStatus="rejected"
       
       
    }
    }

})

export default ProductSlice.reducer