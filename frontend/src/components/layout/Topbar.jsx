import {
    Bell,
    Search,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import "./Topbar.css";


function Topbar() {

    const { user } = useAuth();


    const userName =
        user?.name ||
        "User";


    const userInitial =
        userName
            ?.charAt(0)
            ?.toUpperCase() || "U";


    return (

        <header className="app-topbar">

            {/* Search */}

            <div className="topbar-search">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search anything..."
                />

            </div>


            {/* Right Side */}

            <div className="topbar-right">

                <button
                    type="button"
                    className="notification-btn"
                    aria-label="Notifications"
                >

                    <Bell size={19} />

                    <span className="notification-dot" />

                </button>


                <div className="topbar-divider" />


                <div className="topbar-user">

                    <div className="topbar-avatar">

                        {userInitial}

                    </div>


                    <div className="topbar-user-info">

                        <strong>
                            {userName}
                        </strong>

                        <span>
                            Workspace
                        </span>

                    </div>

                </div>

            </div>

        </header>

    );

}


export default Topbar;