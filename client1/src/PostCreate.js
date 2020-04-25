import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:4000/posts";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(API, { title });
    console.log(res);
    setTitle("");
  };
  return (
    <div className="rounded shadow-lg bg-white p-2 mx-8  ">
      <form onSubmit={handleSubmit}>
        <div className="mb-2 ">
          <label className="text-2xl font-bold text-gray-700" htmlFor="">
            Title
          </label>
          <input
            className="rounded border-gray-200 border px-2 w-full py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="enter post title"
          />
        </div>
        <div>
          <button className="bg-teal-200 rounded px-3 py-2 font-semibold text-teal-700">Save Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
