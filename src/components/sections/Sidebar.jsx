import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faComment, faReply } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const posts = [
    {
      id: 1,
      title: 'Tournament Strategy Guide',
      author: 'Fus1on',
      time: '2 hours ago',
      interactions: { likes: 45, comments: 23 }
    },
    {
      id: 2,
      title: 'New Team Recruitment',
      author: 'Audazi',
      time: '5 hours ago',
      interactions: { likes: 38, comments: 17 }
    },
    {
      id: 3,
      title: 'Best Gaming Setup Tips',
      author: 'Cliff',
      time: '8 hours ago',
      interactions: { likes: 67, comments: 31 }
    },
    {
      id: 4,
      title: 'Weekly Tournament Highlights',
      author: 'Adminless',
      time: '12 hours ago',
      interactions: { likes: 92, comments: 45 }
    }
  ];

  return (
    <div className="sidebar">
      <div className="card community-card">
        <h5>Latest Community Posts</h5>
        <div className="community-posts">
          {posts.map(post => (
            <div key={post.id} className="post">
              <div className="post-avatar">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="post-content">
                <h6>{post.title}</h6>
                <p>By {post.author} • {post.time}</p>
                <div className="post-interactions">
                  <button className="interaction-btn">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{post.interactions.likes}</span>
                  </button>
                  <button className="interaction-btn">
                    <FontAwesomeIcon icon={faComment} />
                    <span>{post.interactions.comments}</span>
                  </button>
                  <button className="interaction-btn">
                    <FontAwesomeIcon icon={faReply} />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
