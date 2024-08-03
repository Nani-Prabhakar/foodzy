import { CDN_URL } from "../utils/constants";
const RestroCard = (props) => {
    const { restObj } = props;
    const {cloudinaryImageId,avgRating,name,cuisines,costForTwo,deliveryTime}=restObj?.info;
    return (
        <div className="p-4 m-4 w-[250px]  h-[400px] rounded-lg bg-gray-100 hover:bg-gray-200" >
            <img
                className="food rounded-lg w-[250] h-[150]"
                alt="food"
                src={CDN_URL+cloudinaryImageId}
            />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h5>{cuisines.join(", ")}</h5>
            
            <h5> {avgRating} Stars</h5>
            <h5> {costForTwo} </h5>
            <h5>{deliveryTime} minutes</h5>
        </div>
    );
};
export default RestroCard;