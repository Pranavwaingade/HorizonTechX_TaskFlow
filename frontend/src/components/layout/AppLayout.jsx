import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "./Topbar";

import "./AppLayout.css";


function AppLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const openSidebar = () => {
        setSidebarOpen(true);
    };


    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    return (

        <div className="app-layout">

            {/* Sidebar */}

            <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                onOpen={openSidebar}
            />


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