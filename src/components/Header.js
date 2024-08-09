import { useState ,useContext} from "react";
import logo from '../assets/logo.png.jpg'
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
    const [btnName,setName]=useState("login");
    const {loggedInUser}=useContext(UserContext);
    //console.log(loggedInUser);
    return (
        <div className="flex justify-between  shadow-xl bg-green-50 sm:bg-yellow-50 lg:bg-neutral-200">
            <div className="logo ">
                <img className="w-[150]" src={logo} alt="Logo" />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">OnlineStatus{useOnlineStatus()?"✅":"🔴"}</li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="px-4"><Link to="/grocery">Grocery.</Link></li>
                    <li className="px-4">Cart</li>
                    <li><button className="login"
                    
                    onClick={()=>{
                      if(btnName==="login"){
                          setName("logout");
                      }
                      else{
                          setName("login");
                      }
                    }}  >{btnName}</button>
                    </li>
                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;