import React from 'react';
import ReadNowArticles from './ReadNowArticles';

const ReadNowContainer = ({ readNow }) => (
    <div className="readNow">

        {readNow.map((article, index) => <ReadNowArticles readNowArticle={article} key={article.title} />)}
    </div>
  );


export default ReadNowContainer;
