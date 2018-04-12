import React from 'react';

class RecommendedArticle extends React.Component {

  constructor(props) {
    super(props)
  }

  handleReadLater = () => {
    this.props.handleSaveArticleToReadLater(this.props.recommendedArticle)
  }

  handleReadNow = () => {
    this.props.handleReadArticle(this.props.recommendedArticle)
  }

  formattedDate = (date) => {
    let pubDate = new Date(date)
    return pubDate.toLocaleDateString()
}

  render() {
    const articleDate = `${(new Date(this.props.recommendedArticle.updated_date)).getMonth() + 1}/${(new Date(this.props.recommendedArticle.updated_date)).getDate()}/${(new Date(this.props.recommendedArticle.updated_date)).getFullYear()}`;

    return (
      <div className="recommendedArticleItem">
      <span className="readLaterInfo">{this.props.recommendedArticle.section} | {this.formattedDate(this.props.recommendedArticle.published_date)} </span> <br />
      <span className="readLaterArticleTitle">{this.props.recommendedArticle.title}</span>
      <div className="readNowButtons">
      <span className="button read-now">
        <button onClick={this.handleReadNow} className="readNow">Read</button>
      </span>
      <span className="button read-later">
        <button onClick={this.handleReadLater} className="readLater">Save</button>
      </span>
      </div>
        </div>);
};}

export default RecommendedArticle;
