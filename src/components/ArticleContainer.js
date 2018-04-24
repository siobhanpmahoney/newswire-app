import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleContainer = ({ articles, readLater, handleSaveArticleToReadLater, handleReadArticle }) => (
    <div className="news-wire article-container">
      <div className="one">
        {articles.map((a, index) => {
            return (
              <ArticleItem article={a} key={index} id={parseInt(index)} handleSaveArticleToReadLater={handleSaveArticleToReadLater} handleReadArticle={handleReadArticle} articles={articles} readLater={readLater}/>
            );
        })
      }
      </div>
    </div>
  );

export default ArticleContainer;
