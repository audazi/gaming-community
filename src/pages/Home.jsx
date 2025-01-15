const Home = () => {
  return (
    <main>
      <div className="cards-container">
        <div className="main-content">
          <div className="card" style={{ backgroundImage: 'url("/images/c1.png")' }}>
            <div className="card-overlay">
              <a href="#">
                <h3>Latest Tournament Results</h3>
                <p>Check out who won the latest tournaments and upcoming events!</p>
              </a>
            </div>
          </div>
          <div className="card" style={{ backgroundImage: 'url("/images/c2.png")' }}>
            <div className="card-overlay">
              <a href="#">
                <h3>Community Highlights</h3>
                <p>See what's happening in our gaming community!</p>
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <div className="card community-card">
            <h5>Latest Community Posts</h5>
            <div className="community-posts">
              <div className="post">
                <div className="post-avatar">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="post-content">
                  <h6>John Doe</h6>
                  <p>Looking for team members for the upcoming tournament!</p>
                  <div className="post-actions">
                    <button><i className="fa-solid fa-heart"></i> 24</button>
                    <button><i className="fa-solid fa-comment"></i> 12</button>
                    <button><i className="fa-solid fa-share"></i> Share</button>
                  </div>
                </div>
              </div>
              <div className="post">
                <div className="post-avatar">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="post-content">
                  <h6>Jane Smith</h6>
                  <p>Just achieved a new personal record in the ladder!</p>
                  <div className="post-actions">
                    <button><i className="fa-solid fa-heart"></i> 45</button>
                    <button><i className="fa-solid fa-comment"></i> 8</button>
                    <button><i className="fa-solid fa-share"></i> Share</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
