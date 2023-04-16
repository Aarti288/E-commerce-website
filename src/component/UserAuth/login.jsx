import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch ,useSelector} from "react-redux";
import { loginuser, registerUser } from "../../Features/AuthSlice";
import "../../component/UserAuth/register.css"
const Login = () => {
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const auth=useSelector((state)=>state.auth);

  console.log(auth);



  useEffect(()=>{
    if(auth._id)
    {
        navigate("/cart")
    }
  },[auth._id,navigate])

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    })
  

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginuser(user))
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
           
            <input type="email" placeholder="Enter email" onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <input type="password" placeholder="Enter password" onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <button> {auth.loginStatus==="pending" ? "Redirecting":"Login"}</button>


           {auth.loginStatus==="rejected" ?  (<p>{auth.loginError}</p>):null}

        </form>
        </>
      );
}
 
export default Login;