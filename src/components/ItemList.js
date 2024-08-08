import { CDN_URL } from "../utils/constants";
const ItemList=({items})=>{
    console.log(items)
    return (
            <div >
                {items.map((item)=><div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2  flex justify-between">
                    
                    
                    <div>
                    <div className="py-2">
                        <span>
                            {item.card.info.name}
                        </span> 
                        <span> 
                            -₹{item.card.info.price?item.card.info.price/100:item.card.info.defaultPrice/100}
                        </span>
                        
                    </div>
                    <p className="text-xs">{item.card.info.description}</p> 
                    </div>
                    <div className="w-3/12 p-4 ">
                        <div className="absolute">
                        <button className="absolute mx-5 rounded-lg p-2  bg-black text-white shadow-lg">ADD+</button>
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