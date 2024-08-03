import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import RestarauntMenu from "./components/RestarauntMenu";
import { ShimmerUI } from "./components/shimmerUI";

// Add a console log to debug
console.log('Importing Grocery component from ./components/Grocery');

const Grocery = lazy(() => import("./components/Grocery"));

const MainApp = () => {
    return (
        <div className="main-App">
            <Header />
            <Outlet />
        </div>
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
