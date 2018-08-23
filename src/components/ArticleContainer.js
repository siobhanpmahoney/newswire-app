import React from 'react';
import ArticleItem from './ArticleItem';

class ArticleContainer extends React.Component {

  render() {
    return (

      <div className="wire-container">
        <h2 className="wire-container-header">Latest Articles from the New York Times</h2>

        {this.props.articles.map((a, index) => {
          return (
            <ArticleItem article={a} key={index} id={parseInt(index)} handleSaveArticleToReadLater={this.props.handleSaveArticleToReadLater} handleReadArticle={this.props.handleReadArticle} articles={this.props.articles} readLater={this.props.readLater}/>
          );
        })
      }

    </div>
  )
}
}


export default ArticleContainer;
