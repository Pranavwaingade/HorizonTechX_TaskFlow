import { Search, Plus } from "lucide-react";
import "./TaskHeader.css";

function TaskHeader({onCreate}) {

    return (

        <div className="task-header">

            <div>

                <h1>Tasks</h1>

                <p>Manage all your tasks efficiently.</p>

            </div>

            <div className="task-actions">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search Tasks..."
                    />

                </div>

                <button
                    className="create-btn"
                    onClick={onCreate}
                >
                    <Plus size={18} />
                    Create Task
                </button>

            </div>

        </div>

    );

}

export default TaskHeader;