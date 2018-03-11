import React from 'react';

const ReadNowArticles = ({ readNowArticle }) => (
    <div className="view-history article-item">
      <span className="read-later article-title">{readNowArticle.title}</span>
    </div>
  );

export default ReadNowArticles;
