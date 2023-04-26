import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch ,useSelector} from "react-redux";
import { registerUser } from "../../Features/AuthSlice";
import "../../component/UserAuth/register.css"
const Register = () => {
  const auth=useSelector((state)=>state.auth);
   const dispatch=useDispatch();
   const navigate=useNavigate();
  




  useEffect(()=>{
   
   
    if(auth._id)
    {
        navigate("/cart")
    }
  })

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    })
  

    const handleSubmit=(e)=>{
        e.preventDefault();
       
        dispatch(registerUser(user))
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>Registration</h2>
            <input type="text" placeholder=" Enter name" onChange={(e)=>setUser({...user,name:e.target.value})}/>
            <input type="email" placeholder="Enter email" onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <input type="password" placeholder="Enter password" onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <button > {auth.registerStatus==="pending" ? "submitting":"Register"}</button>


           {auth.registerStatus==="rejected" ?  (<p>{auth.registerError}</p>):null}

        </form>
        </>
      );
}
 
export default Register;