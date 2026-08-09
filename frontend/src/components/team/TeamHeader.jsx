import {
    Users,
    Plus,
} from "lucide-react";

import "./TeamHeader.css";

function TeamHeader({ onCreate }) {

    return (

        <div className="team-header">

            <div className="team-header-left">

                <div className="team-header-icon">

                    <Users size={28} />

                </div>

                <div>

                    <h1>Team Members</h1>

                    <p>
                        Manage your team members and their roles.
                    </p>

                </div>

            </div>


            <button
                className="add-member-btn"
                onClick={onCreate}
            >

                <Plus size={18} />

                Add Member

            </button>

        </div>

    );

}

export default TeamHeader;