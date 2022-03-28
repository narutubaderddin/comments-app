import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { PostData } from "../../services/PostData";

const AddComment = (props) => {
  const { page, onAddComment } = props;
  const [comment, setComment] = useState();
  const [validateRecaptcha, setValidateRecaptcha] = useState(false);

  const addComment = () => {
    PostData("api/comment/new", { content: comment, page }).then((response) => {
      toast("Your comment has been successfully saved");
      onAddComment(response);
      setComment("");
    });
  };

  const onChangeRecaptcha = () => {
    setValidateRecaptcha(true);
  };

  return (
    <div className="max-w-lg shadow-md mx-auto md:max-w-lg mb-4">
      <div className="w-full p-4 m-auto">
        <label className="block mb-2">
          <span className="text-gray-600">Add a comment</span>
          <textarea
            className="block w-full mt-1 rounded border"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </label>

        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onChangeRecaptcha}
        />

        <button
          className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded mt-1"
          onClick={addComment}
          disabled={!validateRecaptcha || !comment}
        >
          Comment
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddComment;
