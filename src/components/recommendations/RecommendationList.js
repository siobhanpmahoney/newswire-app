import React from 'react'
import RecommendedArticleItem from './RecommendedArticleItem'


class RecommendationList extends React.Component {
  render() {
    return (
          <div className="wire-item-container-block-wrapper">
          <h4>{this.props.section}</h4>
          {this.props.recommendedArticles.map((a) => {
            return <RecommendedArticleItem recommendedArticle = {a}  readLater={this.props.readLater} handleSaveArticleToReadLater={this.props.handleSaveArticleToReadLater} handleReadArticle={this.props.handleReadArticle} />
          })}
        </div>
    )
  }
}

export default RecommendationList
