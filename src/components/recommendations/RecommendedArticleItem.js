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

  dynamicIcon = () => {

    if (this.props.readLater.find((a) => {
      return a.title == this.props.recommendedArticle.title
    })) {
      return (<i className="material-icons">bookmark</i>)
    } else {
      return (<i className="material-icons" onClick={this.handleReadLater}>bookmark_border</i>)
    }
  }

  render() {

    const articleDate = `${(new Date(this.props.recommendedArticle.updated_date)).getMonth() + 1}/${(new Date(this.props.recommendedArticle.updated_date)).getDate()}/${(new Date(this.props.recommendedArticle.updated_date)).getFullYear()}`;

    return (
      <div className="recommendedArticleItem">
        <div className="recommendedArticleItemContent">
        <div className="readNowButtons">
        <span className="button read-now">
          <button onClick={this.handleReadNow} className="readNow"><i className="material-icons">open_in_new</i>
          </button>
        </span>
        <span className="button read-later">

        <button className="readLater">{this.dynamicIcon()}</button>
        </span>
      </div><br />
      <span className="readLaterInfo">{this.props.recommendedArticle.section} | {this.formattedDate(this.props.recommendedArticle.published_date)} </span> <br />
      <span className="readLaterArticleTitle">{this.props.recommendedArticle.title}</span>
</div>
        </div>);
};}

export default RecommendedArticle;
