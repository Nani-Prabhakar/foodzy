import { useRouteError } from "react-router-dom";
const Error=()=>{
    const err=useRouteError();
    console.log(err);
   return (  
   <div>
        <h1>error 404</h1>
        <h4>opps something went  wrong</h4>
        <h2>{err.statusText}</h2>
    </div>
    );
};
export default Error;