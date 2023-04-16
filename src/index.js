import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import ProductReducer, { productFetch } from './Features/ProductSlice';
import { productsApi } from './Features/ProductsApi';
import CartReducer from './Features/CartSlice';
import { getCartTotal } from './Features/CartSlice';
import AuthReducer, { loadUser } from './Features/AuthSlice';


const store=configureStore({
  reducer:{
    products:ProductReducer,
    cart:CartReducer,
    auth:AuthReducer,
    [productsApi.reducerPath]:productsApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(productsApi.middleware)
  
})

store.dispatch(productFetch())
store.dispatch(getCartTotal())
store.dispatch(loadUser(null))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
   
  </React.StrictMode>
);


