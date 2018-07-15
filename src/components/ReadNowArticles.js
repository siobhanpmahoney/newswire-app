import React from 'react';

const ReadNowArticles = ({ readNowArticle }) => (
    <div>
      <div className="readNowArticle"><li className="readNowArticleTitle">{readNowArticle.title}</li></div>
    </div>
  );

export default ReadNowArticles;
