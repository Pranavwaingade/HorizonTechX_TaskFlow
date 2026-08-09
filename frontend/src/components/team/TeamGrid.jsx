import { useEffect, useState } from "react";

import API from "../../services/api";

import TeamCard from "./TeamCard";

import "./TeamGrid.css";

function TeamGrid({
    refresh,
    onEdit,
    onDelete,
}) {

    const [members, setMembers] = useState([]);

    const [loading, setLoading] = useState(true);


    // ========================================
    // Fetch Team Members
    // ========================================

    useEffect(() => {

        fetchTeamMembers();

    }, [refresh]);


    const fetchTeamMembers = async () => {

        try {

            setLoading(true);

            const { data } = await API.get("/team");

            setMembers(data.members || []);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };


    // ========================================
    // Loading
    // ========================================

    if (loading) {

        return (

            <h3 className="team-loading">

                Loading Team Members...

            </h3>

        );

    }


    // ========================================
    // Empty
    // ========================================

    if (members.length === 0) {

        return (

            <div className="team-empty">

                <h2>
                    No Team Members 👥
                </h2>

                <p>
                    Add your first team member to get started.
                </p>

            </div>

        );

    }


    // ========================================
    // Team Grid
    // ========================================

    return (

        <div className="team-grid">

            {members.map((member) => (

                <TeamCard
                    key={member._id}
                    member={member}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );

}

export default TeamGrid;