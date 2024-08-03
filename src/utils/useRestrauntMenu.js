import { useState,useEffect } from "react"
import { RES_MENU } from "./constants";
const useRestrauntMenu=(resId)=>{
    useEffect(()=>{
        fetchMenu();
    },[]);
    const [resInfo,setResInfo]=useState(null);
    const fetchMenu=async()=>{
        const data=await fetch(RES_MENU+resId);
        const json=await data.json();
        setResInfo(json);

    }
    return resInfo;
}
export default useRestrauntMenu;