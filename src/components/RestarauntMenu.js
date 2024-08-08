
import { ShimmerUI } from "./shimmerUI";
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../utils/useRestrauntMenu";
import RestaurantCategory from "./RestaurantCategory";
const RestarauntMenu = () => {
    const{resId}=useParams();
    const restMenu=useRestrauntMenu(resId);
    const name=restMenu?.data?.cards?.[0]?.card?.card?.text;
    //console.log(name)
    const categories=restMenu?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>
        c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
    console.log(categories);
    if (restMenu === null) return <ShimmerUI />;
    //if (!itemCards) return <div>Menu items are not available</div>;

    return (
        <div >  
           <h1 className="text-center font-bold text-2xl my-6">{name}</h1>
           <h2 className="text-center font-bold m-4">MENU</h2>
           {/*Accordion category*/}
           {categories.map((category)=>(
                <RestaurantCategory data={category?.card?.card}/>
           ))}
        </div>
    );
};

export default RestarauntMenu;
