import RestroCard from "./RestroCard";
import { useState, useEffect } from "react";
import { ShimmerUI } from "./shimmerUI";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
export const Body = () => {
    const [originalList, setOriginalList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
        //console.log("useState")
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3724&lng=78.4378&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json)
        const restaurants = json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        console.log(restaurants);
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

    const onlineStatus=useOnlineStatus();
    //console.log(onlineStatus);
    if(onlineStatus===false)return  <h1>Looks like your internet connection is not good please check the connection</h1>

    return filteredList && filteredList.length === 0 ? <ShimmerUI /> : (
        <div className="body">
            <div className=" filter flex ">
                <div className=" search p-4 m-4">
                    <input
                        className="border border-solid border-black"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className="search p-8 m-4 ">
                <button className="px-4 py-2 bg-gray-100 rounded-lg" onClick={handleFilter}>
                    Top Rated Restaurants
                </button>
                </div>
                
            </div>
            <div className="top-rated-res"></div>
            <div className="res-container flex flex-wrap">
                {filteredList.map((Restaurant) => (
                  <Link key={Restaurant.info.id}  to ={`/restaurants/${Restaurant.info.id}`}> <RestroCard restObj={Restaurant} /></Link>  
                ))}
            </div>
        </div>
    );
};

export default Body;
