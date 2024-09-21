import React from 'react';

interface PostShareProps {
  onShare: () => void;
}

const PostShare: React.FC<PostShareProps> = ({ onShare }) => {
  return (
    <div className="post-share">
      <button onClick={onShare}>Share this post</button>
    </div>
  );
};

export default PostShare;