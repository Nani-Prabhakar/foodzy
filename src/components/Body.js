import RestroCard, { withDiscount } from "./RestroCard";
import { useState, useEffect, useContext } from "react";
import { ShimmerUI } from "./shimmerUI";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
export const Body = () => {
    const [originalList, setOriginalList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const{loggedInUser,setUserName}=useContext(UserContext);
    //console.log(loggedInUser)
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3724&lng=78.4378&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        const restaurants = json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setOriginalList(restaurants || []);
        setFilteredList(restaurants || []);
    };

    const handleSearch = () => {
        const searchedRestaurants = originalList.filter((res) => {
            return res.info.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredList(searchedRestaurants);
    };

    const handleFilter = () => {
        const filteredRestaurants = originalList.filter((res) => res.info.avgRating > 4.0);
        setFilteredList(filteredRestaurants);
    };

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) return <h1>Looks like your internet connection is not good please check the connection</h1>;

    const UpdateDiscount = withDiscount(RestroCard);
    return filteredList && filteredList.length === 0 ? <ShimmerUI /> : (
        <div className="body">
            <div className="filter flex pl-16">
                <div className="search p-4 m-4">
                    <input
                        className="border border-solid border-black"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className="search p-8 m-4">
                    <button className="px-4 py-2 bg-gray-100 rounded-lg" onClick={handleFilter}>
                        Top Rated Restaurants
                    </button>
                </div>
                <div className="p-10 m-4">
                <label className="pr-2">USER:</label>
                <input className="border border-solid border-black "
                  value={loggedInUser}
                  onChange={(e) => setUserName(e.target.value)}  >

                </input>
                </div>
                
            </div>
            
            <div className="pl-16 res-container flex flex-wrap">
                {filteredList.map((Restaurant) => (
                    <Link
                        key={Restaurant.info.id}
                        to={`/restaurants/${Restaurant.info.id}`}
                    >
                        {'aggregatedDiscountInfoV3' in Restaurant.info ? (
                            <UpdateDiscount restObj={Restaurant} />
                        ) : (
                            <RestroCard restObj={Restaurant} />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;
