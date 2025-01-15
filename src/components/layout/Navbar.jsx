import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const navItems = [
  {
    title: 'News',
    path: '#',
    dropdown: [
      { title: 'Latest News', path: '/' },
      { title: 'Events', path: '/events' },
      { title: 'Community', path: '/community' }
    ]
  },
  {
    title: 'Info',
    path: '#',
    dropdown: [
      { title: 'Teams', path: '/teams' },
      { title: 'Players', path: '/players' },
      { title: 'Rules', path: '/rules' }
    ]
  },
  {
    title: 'Competitions',
    path: '#',
    dropdown: [
      { title: 'Open Cup', path: '/open-cup' },
      { title: 'Hosted Cup', path: '/hosted-cup' },
      { title: 'Euro Cup', path: '/euro-cup' }
    ]
  },
  {
    title: 'Ladders',
    path: '#',
    dropdown: [
      { title: 'UQ3League Ladder', path: '/uq3league' },
      { title: 'FPSClassico Ladder', path: '/fpsclassico' }
    ]
  },
  {
    title: 'Community',
    path: '#',
    dropdown: [
      { title: 'Discord', path: '/discord' },
      { title: 'Forum', path: '/forum' },
      { title: 'Contact', path: '/contact' }
    ]
  }
];

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header>
      <div className="header-content">
        <div className="left-section">
          <div className="logo">
            <Link to="/">
              <img src="/images/ilog.png" alt="Website Logo" />
            </Link>
          </div>
          <nav>
            <ul className="nav-menu">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link to={item.path} className="nav-link">
                    {item.title}
                  </Link>
                  <ul className="dropdown">
                    {item.dropdown.map((dropItem, dropIndex) => (
                      <li key={dropIndex}>
                        <Link to={dropItem.path}>{dropItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="user-section">
          <button 
            className="user-trigger"
            onClick={() => setShowLogin(!showLogin)}
          >
            <FontAwesomeIcon icon={faUser} />
            Login
          </button>
          {showLogin && (
            <div className="login-card">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="username">
                    <FontAwesomeIcon icon={faUser} /> Username
                  </label>
                  <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <FontAwesomeIcon icon={faLock} /> Password
                  </label>
                  <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="login-button">Login</button>
                <div className="form-footer">
                  <Link to="/forgot-password">Forgot Password?</Link>
                  <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
