import { useEffect, useState } from "react";
import API from "../../services/api";

import ProjectCard from "./ProjectCard";

import "./ProjectGrid.css";

function ProjectGrid() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProjects();

    }, []);

    // const fetchProjects = async () => {

    //     try {

    //         const { data } = await API.get("/projects");

    //         setProjects(data.projects);

    //     }

    //     catch (error) {

    //         console.log(error);

    //     }

    //     finally {

    //         setLoading(false);

    //     }

    // };

    const fetchProjects = async () => {
    try {

        const { data } = await API.get("/projects");

        console.log("Projects Response =>", data);

        setProjects(data.projects);
        console.log(localStorage.getItem("token"))

    } catch (error) {

        console.log(error.response);

    } finally {

        setLoading(false);

    }
};

    if (loading) {

        return <h3>Loading Projects...</h3>;

    }

    if (projects.length === 0) {

        return (

            <h2
                style={{
                    textAlign: "center",
                    marginTop: "60px",
                    color: "var(--text-light)"
                }}
            >

                No Projects Found 🚀

            </h2>

        );

    }

    return (

        <div className="project-grid">

            {projects.map((project) => (

                <ProjectCard
                    key={project._id}
                    project={project}
                />

            ))}

        </div>

    );

}

export default ProjectGrid;