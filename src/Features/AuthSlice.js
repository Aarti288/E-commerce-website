import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
const url="http://localhost:5000/api";


const initialState={
    token:localStorage.getItem("token"),
    _id:"",
    name:"",
    email:"",
   
    registerStatus:"",
    registerError:  "",
    loginStatus:"",
    loginError:  "",
    userLoaded:false

}
export const registerUser=createAsyncThunk(
     "auth/registerUser",
    async (user,{rejectWithValue})=>{
        try{
        const token=await axios.post(`${url}/register`,{
            name:user.name,
            email:user.email,
            password:user.password
         })


         localStorage.setItem("token",token.data);
         return token.data;
        }catch(err){

            console.log(err.response.data);
            return rejectWithValue(err.response.data )

        }

     }
)

export const loginuser=createAsyncThunk(
    "auth/loginuser",
   async (user,{rejectWithValue})=>{
       try{
       const token=await axios.post(`${url}/login`,{
           
           email:user.email,
           password:user.password
        })


        localStorage.setItem("token",token.data);
        return token.data;
       }catch(err){

           console.log(err.response.data);
           return rejectWithValue(err.response.data )

       }

    }
)
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{


        loadUser(state,action){
            const token=state.token
            if(token)
            {
                const user=jwtDecode(token)
                return{

                    ...state,
                    token,
                    name:user.name,
                    email:user.email,
                    _id:user._id,
                   userLoaded:true

                }
            }
        },
        logoutUser(state,action){
            localStorage.removeItem("token");

            return {
                ...state,
                name:"",
    email:"",
    _id:"",
    token:"",
    registerStatus:"",
    registerError:  "",
    loginStatus:"",
    loginError:  "",
    userLoaded:false

            }
        }
    },
    extraReducers:(builder)=>{

     builder.addCase(registerUser.pending,(state,action)=>{
            return {...state,registerStatus:"pending"}
     })
     
     builder.addCase(registerUser.fulfilled,(state,action)=>{
       
         if(action.payload){

            const   user=jwtDecode(action.payload)

            return{
                ...state,
                token:action.payload,
                name:user.name,
                email:user.email,
                _id:user._id,
                registerStatus:"success"

            }

         }else{
              return state; 
         }
        
     })
     
     builder.addCase(registerUser.rejected,(state,action)=>{
return{
    ...state,
    registerStatus:"rejected",
    registerError:action.payload,
}
     })
     builder.addCase(loginuser.pending,(state,action)=>{
        return {...state,loginStatus:"pending"}
 })
 
 builder.addCase(loginuser.fulfilled,(state,action)=>{
   
     if(action.payload){

        const   user=jwtDecode(action.payload)

        return{
            ...state,
            token:action.payload,
            name:user.name,
            email:user.email,
            _id:user._id,
            loginStatus:"success"

        }

     }else{
          return state; 
     }
    
 })
 
 builder.addCase(loginuser.rejected,(state,action)=>{
return{
...state,
loginStatus:"rejected",
loginError:action.payload,
}
 })

    },
})
export const {loadUser,logoutUser}=authSlice.actions
export default authSlice.reducer;