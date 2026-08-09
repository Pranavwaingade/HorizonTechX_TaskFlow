import {
    UserRound,
    Pencil,
    Trash2,
} from "lucide-react";

import "./TeamCard.css";

function TeamCard({
    member,
    onEdit,
    onDelete,
}) {

    const getInitial = (name) => {

        return name
            ?.charAt(0)
            ?.toUpperCase() || "U";

    };


    return (

        <div className="team-card">

            {/* Avatar */}

            <div className="team-avatar">

                {getInitial(member.name)}

            </div>


            {/* Member Info */}

            <div className="team-member-info">

                <h3>
                    {member.name}
                </h3>

                <p>
                    {member.email}
                </p>

            </div>


            {/* Role */}

            <span
                className={`team-role team-role-${member.role
                    ?.toLowerCase()}`}
            >

                {member.role}

            </span>


            {/* Actions */}

            <div className="team-actions">

                <button
                    className="team-edit-btn"
                    onClick={() => onEdit(member)}
                >

                    <Pencil size={15} />

                    Edit

                </button>


                <button
                    className="team-delete-btn"
                    onClick={() => onDelete(member)}
                >

                    <Trash2 size={15} />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default TeamCard;