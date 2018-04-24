import React from 'react'
import RecommendedArticleItem from './RecommendedArticleItem'


class RecommendationList extends React.Component {
  render() {
    return (
      <div>
        <details>
          <summary>{this.props.section}</summary>
          {this.props.recommendedArticles.map((a) => {
            return <RecommendedArticleItem recommendedArticle = {a}  readLater={this.props.readLater} handleSaveArticleToReadLater={this.props.handleSaveArticleToReadLater} handleReadArticle={this.props.handleReadArticle} />
          })}
        </details>
      </div>
    )
  }
}

export default RecommendationList
