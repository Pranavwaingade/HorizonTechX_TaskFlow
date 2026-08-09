import { useEffect, useState } from "react";
import { Pencil, Trash2, Send } from "lucide-react";
import toast from "react-hot-toast";

import API from "../../services/api";

import "./Comments.css";

function Comments({ taskId }) {

  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editText, setEditText] = useState("");

  const [loading, setLoading] = useState(true);


  // ==============================
  // Fetch Comments
  // ==============================

  const fetchComments = async () => {

    try {

      const { data } = await API.get(
        `/comments/task/${taskId}`
      );

      setComments(data.comments || []);

    }

    catch (error) {

      console.log(error);

      toast.error("Failed to load comments");

    }

    finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    if (taskId) {

      fetchComments();

    }

  }, [taskId]);


  // ==============================
  // Add Comment
  // ==============================

  const handleAddComment = async (e) => {

    e.preventDefault();

    if (!text.trim()) {

      toast.error("Please enter a comment");

      return;

    }

    try {

      await API.post(
        `/comments/task/${taskId}`,
        {
          text: text.trim(),
        }
      );

      setText("");

      toast.success("Comment added 💬");

      fetchComments();

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to add comment"
      );

    }

  };


  // ==============================
  // Edit Comment
  // ==============================

  const handleEdit = (comment) => {

    setEditingId(comment._id);

    setEditText(comment.text);

  };


  const handleUpdate = async (commentId) => {

    if (!editText.trim()) {

      toast.error("Comment cannot be empty");

      return;

    }

    try {

      await API.put(
        `/comments/${commentId}`,
        {
          text: editText.trim(),
        }
      );

      setEditingId(null);

      setEditText("");

      toast.success("Comment updated ✏️");

      fetchComments();

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update comment"
      );

    }

  };


  // ==============================
  // Delete Comment
  // ==============================

  const handleDelete = async (commentId) => {

    const confirmDelete = window.confirm(
      "Delete this comment?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/comments/${commentId}`
      );

      toast.success("Comment deleted 🗑️");

      fetchComments();

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete comment"
      );

    }

  };


  if (loading) {

    return (

      <div className="comments-loading">

        Loading comments...

      </div>

    );

  }


  return (

    <div className="comments-container">

      <h2>
        Comments ({comments.length})
      </h2>


      {/* Add Comment */}

      <form
        className="comment-form"
        onSubmit={handleAddComment}
      >

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
        />

        <button type="submit">

          <Send size={16} />

          Add Comment

        </button>

      </form>


      {/* Comments List */}

      <div className="comments-list">

        {comments.length === 0 ? (

          <p className="no-comments">

            No comments yet. Be the first to comment 💬

          </p>

        ) : (

          comments.map((comment) => (

            <div
              className="comment-item"
              key={comment._id}
            >

              <div className="comment-avatar">

                {comment.user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}

              </div>


              <div className="comment-content">

                <div className="comment-header">

                  <strong>

                    {comment.user?.name || "User"}

                  </strong>

                  <small>

                    {new Date(
                      comment.createdAt
                    ).toLocaleString("en-IN")}

                  </small>

                </div>


                {editingId === comment._id ? (

                  <div className="comment-edit">

                    <textarea
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                      rows="2"
                    />

                    <div>

                      <button
                        onClick={() =>
                          handleUpdate(comment._id)
                        }
                      >
                        Save
                      </button>

                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditText("");
                        }}
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                ) : (

                  <p>

                    {comment.text}

                  </p>

                )}


                {editingId !== comment._id && (

                  <div className="comment-actions">

                    <button
                      onClick={() =>
                        handleEdit(comment)
                      }
                    >

                      <Pencil size={14} />

                      Edit

                    </button>


                    <button
                      onClick={() =>
                        handleDelete(comment._id)
                      }
                    >

                      <Trash2 size={14} />

                      Delete

                    </button>

                  </div>

                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Comments;