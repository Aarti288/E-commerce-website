import { Outlet, useNavigate } from "react-router";

const Product = () => {
    const navigate=useNavigate();
    return ( 
        <div>
          

            <button className="create-products" onClick={()=>navigate("/admin/product/createproduct")}>Create Product</button>
            <Outlet/>
        </div>
     );
}
 
export default Product;





