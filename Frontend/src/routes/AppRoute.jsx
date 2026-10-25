import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/common/user/UserLayout";
import Home from "../components/pages/Home";
import Register from "../components/pages/user/Register";
import Login from "../components/pages/user/Login";
import Products from "../components/pages/user/Products";
import Cart from "../components/pages/user/Cart";
import Checkout from "../components/pages/user/Checkout";
import AdminLayout from "../components/common/admin/AdminLayout";
import Dashboard from "../components/pages/admin/Dashboard";
import ProductAdmin from "../components/pages/admin/ProductAdmin";
import AddProduct from "../components/pages/admin/AddProduct";
import ProtectedRoute from "./ProtectedRoute";



const router=createBrowserRouter([
    {
        path:"/",
        element:<UserLayout/>,
        children:[
            {index:true,element:<Home/>},
            {path:'register',element:<Register/>},
            {path:'login',element:<Login/>},
            {path:'products',element:<Products/>},
            {
               element:<ProtectedRoute/>,
               children:[
                   {path:'cart',element:<Cart/>},
                   {path:'checkout',element:<Checkout/>}
               ]
            },

           
        ]
    },

    {
        element:<ProtectedRoute/>,
        children:[
            {
            path:"/admin",
            element:<AdminLayout/>,
             children:[
            {index:true,element:<Dashboard/>},
            {path:'products',element:<ProductAdmin/>},
            {path:'products/add',element:<AddProduct/>},
        ]
    }
        ]
    },
    

  
    
])

export default router;
