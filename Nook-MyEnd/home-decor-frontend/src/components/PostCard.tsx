import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  username: string;
  content: string;
  userId: string;
  postId: string;
}

const PostCard: React.FC<PostCardProps> = ({ username, content, userId, postId }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const likePost = async () => {
    try {
      const response = await fetch('/like/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error liking the post", error);
    }
  };

  const commentOnPost = async (comment: string) => {
    try {
      const response = await fetch('/comment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId, content: comment }),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error commenting on the post", error);
    }
  };

  const sharePost = async () => {
    try {
      const response = await fetch('/share/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error sharing the post", error);
    }
  };

  const savePost = async () => {
    try {
      const response = await fetch('/save/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error saving the post", error);
    }
  };

  return (
    <div className="post-card">
      {/* Rest of the component code */}
    </div>
  );
};

export default PostCard;
