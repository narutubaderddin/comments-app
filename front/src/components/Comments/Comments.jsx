import React, { useEffect, useState } from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import { GetData } from "../../services/GetData";

const Comments = (props) => {
  const { page } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    GetData(`api/comment?${page && "page=" + page}`, {}).then((result) => {
      setComments(result);
    });
  }, []);

  const handleAddComment = (newComment) => {
    setComments([newComment, ...comments]);
  };
  return (
    <div className="py-10 h-screen  px-2">
      <AddComment page={page} onAddComment={handleAddComment} />

      <div className="bg-gray-300 max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full p-4">
            <ul>
              {comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
