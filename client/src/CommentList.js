import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = Object.values(comments).map((comment) => (
    <li className="text-sm mb-2 " key={comment.id}>
      {comment.content}
    </li>
  ));
  return <ul className="px-8 mb-2  flex flex-col  justify-between ">{renderedComments}</ul>;
};

export default CommentList;
