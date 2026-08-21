import { useEffect, useState } from "react";
import {
    MessageCircle,
    Send,
    Pencil,
    Trash2,
    X,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../../services/api";

import "./TaskComments.css";


function TaskComments({ taskId }) {

    const [comments, setComments] = useState([]);

    const [text, setText] = useState("");

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [editText, setEditText] =
        useState("");


    // Fetch Comments

    const fetchComments = async (showLoader = false) => {

        if (!taskId) return;

        try {

            if (showLoader) {
                setLoading(true);
            }

            const { data } =
                await API.get(
                    `/comments/task/${taskId}`
                );

            setComments(
                data.comments || []
            );

        } catch (error) {

            console.log(
                "Comments error:",
                error
            );

            // Toast only during initial loading
            if (showLoader) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load comments"
                );

            }

        } finally {

            if (showLoader) {
                setLoading(false);
            }

        }

    };


    // Load Comments + Auto Refresh

    useEffect(() => {

        if (!taskId) return;


        // Initial load
        fetchComments(true);


        // Auto refresh every 3 seconds
        const interval = setInterval(() => {

            fetchComments(false);

        }, 2000);


        // Cleanup interval
        return () => {

            clearInterval(interval);

        };

    }, [taskId]);


    // Add Comment

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!text.trim()) {

            toast.error(
                "Comment cannot be empty"
            );

            return;

        }


        try {

            setSubmitting(true);


            const { data } =
                await API.post(
                    `/comments/task/${taskId}`,
                    {
                        text: text.trim(),
                    }
                );


            setComments((previous) => [

                data.comment,

                ...previous,

            ]);


            setText("");


            toast.success(
                "Comment added 💬"
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add comment"
            );

        } finally {

            setSubmitting(false);

        }

    };


    // Start Edit

    const handleEditStart = (comment) => {

        setEditingId(
            comment._id
        );

        setEditText(
            comment.text
        );

    };


    // Cancel Edit

    const handleEditCancel = () => {

        setEditingId(null);

        setEditText("");

    };


    // Update Comment

    const handleEditSave = async (
        commentId
    ) => {

        if (!editText.trim()) {

            toast.error(
                "Comment cannot be empty"
            );

            return;

        }


        try {

            const { data } =
                await API.put(
                    `/comments/${commentId}`,
                    {
                        text:
                            editText.trim(),
                    }
                );


            setComments((previous) =>

                previous.map((comment) =>

                    comment._id === commentId
                        ? data.comment
                        : comment

                )

            );


            setEditingId(null);

            setEditText("");


            toast.success(
                "Comment updated ✅"
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update comment"
            );

        }

    };


    // Delete Comment

    const handleDelete = async (
        commentId
    ) => {

        const confirmed =
            window.confirm(
                "Delete this comment?"
            );


        if (!confirmed) return;


        try {

            await API.delete(
                `/comments/${commentId}`
            );


            setComments((previous) =>

                previous.filter(
                    (comment) =>
                        comment._id !== commentId
                )

            );


            toast.success(
                "Comment deleted 🗑️"
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete comment"
            );

        }

    };


    // Format Date

    const formatDate = (date) => {

        if (!date) return "";

        return new Date(
            date
        ).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    };


    // UI

    return (

        <section className="task-comments">


            {/* Header */}

            <div className="comments-header">

                <div className="comments-title">

                    <MessageCircle
                        size={19}
                    />

                    <h3>
                        Comments
                    </h3>

                    <span>
                        {comments.length}
                    </span>

                </div>

            </div>


            {/* Add Comment */}

            <form
                className="comment-form"
                onSubmit={handleSubmit}
            >

                <textarea
                    placeholder="Write a comment..."
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                    rows="3"
                    disabled={submitting}
                />


                <div className="comment-form-footer">

                    <span>
                        Share your thoughts with
                        the team.
                    </span>


                    <button
                        type="submit"
                        disabled={
                            submitting ||
                            !text.trim()
                        }
                    >

                        <Send size={15} />

                        {submitting
                            ? "Posting..."
                            : "Post Comment"
                        }

                    </button>

                </div>

            </form>


            {/* Comments List */}

            <div className="comments-list">


                {/* Loading */}

                {loading && (

                    <div className="comments-state">

                        Loading comments...

                    </div>

                )}


                {/* Empty */}

                {!loading &&
                    comments.length === 0 && (

                        <div className="comments-state empty">

                            <MessageCircle
                                size={28}
                            />

                            <p>
                                No comments yet.
                            </p>

                            <span>
                                Be the first to
                                comment.
                            </span>

                        </div>

                    )}


                {/* Comments */}

                {!loading &&
                    comments.map((comment) => (

                        <article
                            className="comment-item"
                            key={comment._id}
                        >


                            {/* Avatar */}

                            <div className="comment-avatar">

                                {comment.user?.avatar ? (

                                    <img
                                        src={
                                            comment.user.avatar
                                        }
                                        alt={
                                            comment.user.name ||
                                            "User"
                                        }
                                    />

                                ) : (

                                    (
                                        comment.user?.name ||
                                        "U"
                                    )
                                        .charAt(0)
                                        .toUpperCase()

                                )}

                            </div>


                            {/* Content */}

                            <div className="comment-content">

                                <div className="comment-top">

                                    <div>

                                        <strong>
                                            {
                                                comment.user?.name ||
                                                "Unknown User"
                                            }
                                        </strong>

                                        <time>
                                            {
                                                formatDate(
                                                    comment.createdAt
                                                )
                                            }
                                        </time>

                                    </div>


                                    {/* Actions */}

                                    {editingId !==
                                        comment._id && (

                                        <div className="comment-actions">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEditStart(
                                                        comment
                                                    )
                                                }
                                                title="Edit"
                                            >

                                                <Pencil
                                                    size={14}
                                                />

                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        comment._id
                                                    )
                                                }
                                                title="Delete"
                                            >

                                                <Trash2
                                                    size={14}
                                                />

                                            </button>

                                        </div>

                                    )}

                                </div>


                                {/* Edit Comment */}

                                {editingId ===
                                    comment._id ? (

                                    <div className="comment-edit">

                                        <textarea
                                            value={
                                                editText
                                            }
                                            onChange={(e) =>
                                                setEditText(
                                                    e.target.value
                                                )
                                            }
                                            rows="3"
                                        />


                                        <div className="comment-edit-actions">

                                            <button
                                                type="button"
                                                className="comment-cancel-btn"
                                                onClick={
                                                    handleEditCancel
                                                }
                                            >

                                                <X
                                                    size={14}
                                                />

                                                Cancel

                                            </button>


                                            <button
                                                type="button"
                                                className="comment-save-btn"
                                                onClick={() =>
                                                    handleEditSave(
                                                        comment._id
                                                    )
                                                }
                                            >

                                                Save

                                            </button>

                                        </div>

                                    </div>

                                ) : (

                                    <p className="comment-text">

                                        {comment.text}

                                    </p>

                                )}

                            </div>

                        </article>

                    ))}

            </div>

        </section>

    );

}


export default TaskComments;