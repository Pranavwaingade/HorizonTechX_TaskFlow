import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

import API from "../services/api";

import "./Comments.css";

function Comments() {

    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);

    

    useEffect(() => {

        fetchComments();

    }, []);


    const fetchComments = async () => {

        try {

            const { data } = await API.get("/comments");

            setComments(data.comments || []);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (
            <h3 className="comments-loading">
                Loading Comments...
            </h3>
        );

    }


    return (

        <section className="comments-page">

            {/* Header */}

            <div className="comments-header">

                <div className="comments-header-icon">

                    <MessageSquare size={28} />

                </div>

                <div>

                    <h1>Comments</h1>

                    <p>
                        View comments from your tasks.
                    </p>

                </div>

            </div>


            {/* Comments */}

            {comments.length === 0 ? (

                <div className="comments-empty">

                    <MessageSquare size={40} />

                    <h2>
                        No Comments Yet
                    </h2>

                    <p>
                        Comments added to your tasks
                        will appear here.
                    </p>

                </div>

            ) : (

                <div className="comments-list">

                    {comments.map((comment) => (

                        <div
                            className="comment-card"
                            key={comment._id}
                        >

                            <div className="comment-avatar">

                                {comment.user?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}

                            </div>


                            <div className="comment-content">

                                <div className="comment-top">

                                    <h3>

                                        {comment.user?.name ||
                                            "User"}

                                    </h3>

                                    <small>

                                        {comment.createdAt
                                            ? new Date(
                                                comment.createdAt
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )
                                            : ""}

                                    </small>

                                </div>


                                <p>
                                    {comment.text}
                                </p>


                                <span className="comment-task">

                                    Task:{" "}

                                    {comment.task?.title ||
                                        "Unknown Task"}

                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    );

}

export default Comments;