import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = Object.values(comments).map((comment) => {
    let content = comment.content;
    if (comment.status === "Pending") {
      content = " This comment is awaiting Moderation";
    }
    if (comment.status === "rejected") {
      content = " This comment has been rejected";
    }
    return (
      <li className="mb-2 text-sm " key={comment.id}>
        {content} <span className="pl-2 text-xs ">{comment.status}</span>
      </li>
    );
  });
  return <ul className="flex flex-col justify-between px-8 mb-2 ">{renderedComments}</ul>;
};

export default CommentList;
