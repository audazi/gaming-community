import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MainContent = () => {
  const cards = [
    {
      id: 1,
      image: 'images/c1.png',
      title: 'Latest Tournament Results',
      description: 'Check out the results from our latest competitive gaming tournaments and championships.',
      interactions: { likes: 245, comments: 89, shares: 34 },
      buttonText: 'View Results'
    },
    {
      id: 2,
      image: 'images/c2.png',
      title: 'Upcoming Events',
      description: 'Stay updated with our upcoming tournaments and gaming events.',
      interactions: { likes: 178, comments: 56, shares: 23 },
      buttonText: 'View Events'
    },
    {
      id: 3,
      image: 'images/c3.png',
      title: 'Team Rankings',
      description: 'View the current rankings and statistics for all teams in our competitive leagues.',
      interactions: { likes: 312, comments: 145, shares: 67 },
      buttonText: 'Check Rankings'
    }
  ];

  return (
    <div className="main-content">
      {cards.map(card => (
        <div key={card.id} className="card" style={{ backgroundImage: `url(${card.image})` }}>
          <div className="card-overlay">
            <a href="#">
              <h5>{card.title}</h5>
            </a>
            <p>{card.description}</p>
            <div className="card-interactions">
              <button className="interaction-btn">
                <FontAwesomeIcon icon={faHeart} />
                <span>{card.interactions.likes}</span>
              </button>
              <button className="interaction-btn">
                <FontAwesomeIcon icon={faComment} />
                <span>{card.interactions.comments}</span>
              </button>
              <button className="interaction-btn">
                <FontAwesomeIcon icon={faShare} />
                <span>{card.interactions.shares}</span>
              </button>
            </div>
            <a href="#" className="card-button">
              {card.buttonText}
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
