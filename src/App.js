import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import RestarauntMenu from "./components/RestarauntMenu";
import { ShimmerUI } from "./components/shimmerUI";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
// Add a console log to debug
console.log('Importing Grocery component from ./components/Grocery');

const Grocery = lazy(() => import("./components/Grocery"));

const MainApp = () => {
    const loggedInUser=useContext(UserContext)

    const[UserName,setUserName]=useState(" ");

    useEffect(()=>{
        const data={
            name:"Nani Prabhakar"
        };
        setUserName(data.name)
    },[])

    return (
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser:UserName,setUserName}}>
            <div className="main-App">
            <Header />
            <Outlet />
            </div>
        </UserContext.Provider>
        </Provider>
        
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainApp />,
        children: [
            {
                path: "/",
                element: <Body />,
                errorElement: <Error />,
            },
            {
                path: "/about",
                element: <About />,
                errorElement: <Error />,
            },
            {
                path: "/cart",
                element: <Cart />,
                errorElement: <Error />,
            },
            {
                path: "/contact",
                element: <ContactUs />,
                errorElement: <Error />,
            },
            {
                path: "/grocery",
                element: (
                    <Suspense fallback={<ShimmerUI />}>
                        <Grocery />
                    </Suspense>
                ),
                errorElement: <Error />,
            },
            {
                path: "/restaurants/:resId",
                element: <RestarauntMenu />,
                errorElement: <Error />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
