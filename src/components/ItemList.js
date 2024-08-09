import { CDN_URL } from "../utils/constants";
const ItemList=({items})=>{
    //console.log(items)
    return (
            <div >
                {items.map((item)=><div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2  flex justify-between">
                    
                    
                    <div className="w-3/4">
                    <div className="py-2">
                        <span className="font-semibold text-lg">
                            {item.card.info.name}
                        </span> 
                        <span className="font-semibold text-lg"> 
                            -₹{item.card.info.price?item.card.info.price/100:item.card.info.defaultPrice/100}
                        </span>
                        
                    </div>
                    <p className="text-xs">{item.card.info.description}</p> 
                    </div>
                    <div className="w-3/12 p-4 ">
                        <div className="absolute px-10 py-20">
                        <button type="button" className="py-2.5 px-5 me-2 mb-2 text-md  font-bold font-xl text-green-600 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">ADD</button>
                        </div>

                        <img 
                        src={CDN_URL+item.card.info.imageId} className="rounded-lg" >
                        </img>
                    </div>
                </div>
                      
                )}
           
         </div>
    );
};
export default ItemList;