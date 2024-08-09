
import { ShimmerUI } from "./shimmerUI";
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../utils/useRestrauntMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
const RestarauntMenu = () => {
    const{resId}=useParams();
    const restMenu=useRestrauntMenu(resId);
    const name=restMenu?.data?.cards?.[0]?.card?.card?.text;
    //console.log(name)
    const categories=restMenu?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>
        c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
    const[showIndex,setshowIndex]=useState(null);
    //console.log(categories);
    if (restMenu === null) return <ShimmerUI />;
    //if (!itemCards) return <div>Menu items are not available</div>;
    
    return (
        <div >  
           <h1 className="text-center font-bold text-2xl my-6">{name}</h1>
           <h2 className="text-center  m-4 text-lg">༺   M E N U  ༻</h2>
           {/*Accordion category*/}
           {categories.map((category,index)=>(
             
                <RestaurantCategory 
                    key={category?.card?.card.title} 
                    data={category?.card?.card}
                    showItem={index===showIndex?true:false}
                    setshowIndex={()=>setshowIndex(index)}
                />
               
           ))}
        </div>
    );
};

export default RestarauntMenu;
