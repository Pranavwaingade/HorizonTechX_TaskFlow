import { Outlet } from "react-router-dom";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "./Topbar";

import "./AppLayout.css";


function AppLayout() {

    return (

        <div className="app-layout">

            {/* Sidebar */}

            <Sidebar />


            {/* Main Area */}

            <div className="app-main">

                <Topbar />

                <main className="app-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}


export default AppLayout;