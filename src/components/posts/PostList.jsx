import "./PostList.css";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="empty-posts">
        <div className="empty-icon">
          <i className="bi bi-journal-x"></i>
        </div>
        <h3>No Posts Found</h3>
        <p>Be the first to create a post in this category!</p>
      </div>
    );
  }
  console.log("PostList posts:", posts);

  return (
    <div className="post-list-container">
      <div className="post-list-grid">
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
