import React from 'react';

const LatestArticles = () => {
  const articles = [
    {
      id: 1,
      title: "Latest Tournament Results",
      excerpt: "Check out the results from our latest gaming tournament...",
      date: "2025-01-13",
      image: "/images/tournament.jpg"
    },
    {
      id: 2,
      title: "New Season Announcement",
      excerpt: "Get ready for the upcoming gaming season with exciting changes...",
      date: "2025-01-12",
      image: "/images/season.jpg"
    },
    {
      id: 3,
      title: "Community Spotlight",
      excerpt: "Meet our most active community members and their achievements...",
      date: "2025-01-11",
      image: "/images/community.jpg"
    }
  ];

  return (
    <section className="latest-articles">
      <div className="container">
        <h2 className="section-title">Latest Articles</h2>
        <div className="articles-grid">
          {articles.map(article => (
            <article key={article.id} className="article-card">
              <div className="article-image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="article-content">
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="article-date">{article.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
