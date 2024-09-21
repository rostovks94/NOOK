import React, { useState } from 'react';

interface PostCommentsProps {
  comments: string[];
  onAddComment: (comment: string) => void;
}

const PostComments: React.FC<PostCommentsProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="post-comments">
      <div className="comments-list">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <input 
        type="text" 
        placeholder="Add a comment..." 
        value={newComment} 
        onChange={(e) => setNewComment(e.target.value)} 
      />
      <button onClick={handleAddComment}>Comment</button>
    </div>
  );
};

export default PostComments;