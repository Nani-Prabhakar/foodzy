
import { ShimmerUI } from "./shimmerUI";
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../utils/useRestrauntMenu";
const RestarauntMenu = () => {
    //const [restMenu, setRestMenu] = useState(null);
    const{resId}=useParams();
    //console.log("param",resId);
    const restMenu=useRestrauntMenu(resId);
    const cuisines = restMenu?.data?.cards?.[2]?.card?.card?.info;
    const itemCards = restMenu?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards;

    if (restMenu === null) return <ShimmerUI />;
    if (!itemCards) return <div>Menu items are not available</div>;

    return (
        <div>
            <h1>{cuisines ? cuisines.name : "Restaurant Menu"}</h1>
            <h2>Menu</h2>
            <ul>
                {itemCards.map((item, index) => (
                    <li key={index}>{item.card.info.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RestarauntMenu;
