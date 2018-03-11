import React from 'react';
import ReadLaterArticles from './ReadLaterArticles';

const ReadLaterContainer = ({ readLater, handleReadArticle, handleDeleteArticle }) => (
    <div className="read-later-article-container two">
        {readLater.map((article, index) => <ReadLaterArticles readLaterArticle={article} key={index} handleReadArticle={handleReadArticle} handleDeleteArticle={handleDeleteArticle}/>)}
    </div>
  );


export default ReadLaterContainer;
