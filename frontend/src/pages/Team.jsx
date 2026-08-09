import { useState } from "react";
import toast from "react-hot-toast";

import API from "../services/api";

import TeamHeader from "../components/team/TeamHeader";
import TeamGrid from "../components/team/TeamGrid";
import TeamModal from "../components/team/TeamModal";

import "./Team.css";

function Team() {

    const [open, setOpen] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const [editingMember, setEditingMember] = useState(null);


    // ========================================
    // Edit Member
    // ========================================

    const handleEdit = (member) => {

        setEditingMember(member);

        setOpen(true);

    };


    // ========================================
    // Delete Member
    // ========================================

    const handleDelete = async (member) => {

        const confirmDelete = window.confirm(
            `Delete "${member.name}" from team?`
        );

        if (!confirmDelete) return;


        try {

            await API.delete(
                `/team/${member._id}`
            );

            toast.success(
                "Team member deleted 🗑️"
            );

            setRefresh(prev => !prev);

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete team member"
            );

        }

    };


    // ========================================
    // Refresh Team
    // ========================================

    const handleSuccess = () => {

        setRefresh(prev => !prev);

    };


    return (

        <section className="team-page">

            <TeamHeader

                onCreate={() => {

                    setEditingMember(null);

                    setOpen(true);

                }}

            />


            <TeamGrid

                refresh={refresh}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />


            <TeamModal

                open={open}

                onClose={() => {

                    setOpen(false);

                    setEditingMember(null);

                }}

                member={editingMember}

                onSuccess={handleSuccess}

            />

        </section>

    );

}

export default Team;