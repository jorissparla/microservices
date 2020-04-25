import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const API = "http://localhost:4002/posts";
const PostList = () => {
  const [posts, setPosts] = useState({});
  let res = null;

  const fetchPosts = async () => {
    const res = await axios.get(API);
    setPosts(res?.data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);
  const renderedPosts = Object.values(posts).map((post) => (
    <div className=" mb-5 pt-2 border-b border-gray-500" key={post.id}>
      <div className="w-full mb-2 text-xl text-teal-700 border-l-8  border-blue-600 pl-2">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));
  return <div className="m-8 flex flex-col  justify-between ">{renderedPosts}</div>;
};

export default PostList;
