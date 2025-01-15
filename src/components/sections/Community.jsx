import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faTwitch } from '@fortawesome/free-brands-svg-icons';

const Community = () => {
  const communityLinks = [
    {
      id: 1,
      title: "Join our Discord",
      description: "Connect with players, join tournaments, and stay updated",
      icon: faDiscord,
      link: "#",
      color: "#7289DA"
    },
    {
      id: 2,
      title: "Follow on Twitter",
      description: "Get the latest news and announcements",
      icon: faTwitter,
      link: "#",
      color: "#1DA1F2"
    },
    {
      id: 3,
      title: "Watch on Twitch",
      description: "Watch live tournaments and player streams",
      icon: faTwitch,
      link: "#",
      color: "#9146FF"
    }
  ];

  return (
    <section className="community-section">
      <div className="container">
        <h2 className="section-title">Join Our Community</h2>
        <div className="community-grid">
          {communityLinks.map(item => (
            <a 
              href={item.link} 
              key={item.id} 
              className="community-card"
              style={{"--accent-color": item.color}}
            >
              <FontAwesomeIcon icon={item.icon} className="community-icon" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
