import React from 'react';
import ReadNowArticles from './ReadNowArticles';

const ReadNowContainer = ({ readNow }) => (
    <div className="view-history article-container two">
        {readNow.map((article, index) => <ReadNowArticles readNowArticle={article} key={index} />)}
    </div>
  );


export default ReadNowContainer;
