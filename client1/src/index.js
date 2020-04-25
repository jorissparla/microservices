import React from "react";
import { render } from "react-dom";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export const App = () => {
  return (
    <div className="h-screen antialiased ">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

render(<App />, document.getElementById("root"));
