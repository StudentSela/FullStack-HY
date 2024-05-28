import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateLike, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    border: 'solid',
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 20,
    borderRadius: 8,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
  };

  const [visible, setVisible] = useState(false);

  const handleLike = () => updateLike(blog);

  const handleRemove = () => deleteBlog(blog);

  return (
    <div style={blogStyle}>
      <h3>
        <p id="blog-title">
          {blog.title} - {blog.author}
        </p>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </h3>
      {visible && (
        <div className="hidden-content">
          <a href={blog.url}>{blog.url}</a>
          <p>
            Likes : {blog.likes}
            <button onClick={handleLike} data-testid="like-btn" 
            style={{ marginLeft: '10px', 
            padding: '5px 10px', 
            border: '1px solid #000', 
            borderRadius: '4px' }}>
              like
            </button>
          </p>
          <p>added by: {blog?.user?.name}</p>
          {user.username === blog?.user?.username && (
            <button onClick={handleRemove} 
            style={{ padding: '5px 10px', 
            border: '1px solid #000', 
            borderRadius: '4px' }}
            >remove</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func,
  deleteBlog: PropTypes.func,
  user: PropTypes.object,
};

export default Blog;