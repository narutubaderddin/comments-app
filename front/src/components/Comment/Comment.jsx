import React, { useState } from "react";
import StarRatings from "react-star-ratings/build/star-ratings";
import { GetData } from "../../services/GetData";
import { PostData } from "../../services/PostData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comment = (props) => {
  const { comment } = props;
  const [replies, setReplies] = useState(comment.replies);
  const [showReplies, setShowReplies] = useState(false);
  const [rating, setRating] = useState(comment.rating);
  const [replyComment, setReplyComment] = useState("");

  const handleRating = (rate) => {
    setRating(rate);
    GetData(`api/comment/setRating/${comment.id}/${rate}`, {
      rating: rating,
    }).then((result) => {
      toast.success("Your rating has been successfully saved");
    });
  };

  const addReplyComment = () => {
    PostData(`api/comment/new-reply-comment/${comment.id}`, {
      content: replyComment,
    }).then((response) => {
      toast("Your reply has been successfully saved");
      setReplyComment("");
      const newReplies = [...replies, response];
      setReplies(newReplies);
    });
  };

  return (
    <>
      <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
        <div className="flex ml-2" onClick={() => setShowReplies(!showReplies)}>
          <img
            src={comment?.createdBy?.providerPic || "/profile-img.jpg"}
            width="40"
            height="40"
            className="rounded-full"
            alt="profile"
          />
          <div className="flex flex-col ml-2">
            <span className="font-medium text-black">
              {comment?.createdBy?.name}
            </span>
            <span
              className="text-sm text-gray-400 truncate w-32"
              title={comment.content}
            >
              {comment.content}
            </span>
          </div>
        </div>
        <div className="flex  items-center">
          <span className="text-gray-300">
            {comment.createdAt}
            <div>
              <StarRatings
                rating={rating || 0}
                starDimension="20px"
                starSpacing="5px"
                changeRating={handleRating}
              />
            </div>
          </span>
          <i className="fa fa-star text-green-400"></i>
        </div>
      </li>
      {showReplies && (
        <>
          {replies.map((reply) => (
            <li
              className="flex justify-between items-center mt-2 p-5 hover:shadow-lg rounded cursor-pointer transition"
              onClick={() => setShowReplies(!showReplies)}
              key={reply.id}
            >
              <div className="flex ml-2">
                <img
                  src={reply?.createdBy?.providerPic || "/profile-img.jpg"}
                  width="40"
                  height="40"
                  className="rounded-full"
                  alt="profile"
                />
                <div className="flex flex-col ml-2">
                  <span className="font-medium text-black">
                    {reply?.createdBy?.name}
                  </span>
                  <span className="text-sm text-gray-400 truncate w-32">
                    {reply.content}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-300">{reply.createdAt}</span>
                <i className="fa fa-star text-green-400"></i>
              </div>
            </li>
          ))}
          <div className="max-w-lg shadow-md mx-auto md:max-w-lg mb-4">
            <div className="w-full p-4 m-auto">
              <label className="block mb-2">
                <span className="text-gray-600">Add a comment</span>
                <textarea
                  className="block w-full mt-1 rounded"
                  rows="3"
                  value={replyComment}
                  onChange={(e) => setReplyComment(e.target.value)}
                ></textarea>
              </label>
              <button
                className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                onClick={addReplyComment}
              >
                Reply
              </button>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Comment;
