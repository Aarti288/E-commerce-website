import {createSlice} from "@reduxjs/toolkit";
import {toast}  from "react-toastify";
const initialState={
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
}
const CartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){


           const index= state.cartItems.findIndex((item)=>item.id===action.payload.id);

           if(index>=0)
           {
              state.cartItems[index].cartQuantity+=1;
              toast.info(`increased ${ state.cartItems[index].name} quantity`,{
                position:"bottom-left"
              })
           }else{
            const dummyProduct={...action.payload,cartQuantity:1}
            state.cartItems.push(dummyProduct)
            toast.success(`${action.payload.name} added to your cart`,{
                position:"bottom-left"
              })
           }
           localStorage.setItem("cartItems",JSON.stringify(state.cartItems))



            
        },


        removecart(state,action){
            const nextCartItem= state.cartItems.filter(
                cartItem => cartItem.id!==action.payload.id
            )
            state.cartItems=nextCartItem
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} removed from cart`,{
                position:"bottom-left"
              })



        },
        clearCart(state,action)
        {
            state.cartItems=[];
            toast.error(`removed all cart`,{
                position:"bottom-left"
              })
              localStorage.setItem("cartItems",JSON.stringify(state.cartItems))


        },

        getCartTotal(state,action){
           let {total,quantity}= state.cartItems.reduce((cartTotal,cartItem)=>{
                const {price,cartQuanity}=cartItem;
                const itemtotal=price*cartQuanity;
                cartTotal.total+=itemtotal;


                cartTotal.quantity += cartQuanity;
                return cartTotal;
            },{
                total:0,
                quantity:0
            })

            state.cartTotalQuantity=quantity;
            state.cartTotalAmount=total;
        }
    }
})

export const {addToCart,removecart,clearCart,getCartTotal}=CartSlice.actions;


export default CartSlice.reducer;