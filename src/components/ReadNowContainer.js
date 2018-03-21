import React from 'react';
import ReadNowArticles from './ReadNowArticles';

const ReadNowContainer = ({ readNow }) => (
    <div className="readNow">
      <ol>
        {readNow.map((article, index) => <ReadNowArticles readNowArticle={article} key={article.title} />)}
      </ol>
    </div>
  );


export default ReadNowContainer;
