import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const API = `http://localhost:4001/posts/${postId}/comments`;
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(API, { content });
    console.log("comment", res);
    setContent("");
  };
  return (
    <div className=" bg-transparent p-2 mx-8  ">
      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex justify-between items-center ">
          <input
            className="rounded border-gray-200 border px-2 w-3/4 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="enter comment"
          />
          <div>
            <button className="bg-teal-200 rounded px-3 py-2 font-semibold text-teal-700">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentCreate;
