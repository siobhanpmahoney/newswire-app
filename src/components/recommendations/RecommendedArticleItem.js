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
    console.log(this.props.recommendedArticle)

    const articleDate = `${(new Date(this.props.recommendedArticle.updated_date)).getMonth() + 1}/${(new Date(this.props.recommendedArticle.updated_date)).getDate()}/${(new Date(this.props.recommendedArticle.updated_date)).getFullYear()}`;

    return (
      <div className="articleItemNewswire">
        <div className="articleItemInfo">
        <div className="newsWireButtons">
        <span className="button read-now">
          <button onClick={this.handleReadNow} className="readNow"><i className="material-icons">open_in_new</i>
          </button>
        </span>
        <span className="button read-later">

        <button className="readLater">{this.dynamicIcon()}</button>
        </span>
      </div><br />
      <span className="wireItemSection">
        {this.props.recommendedArticle.section}
      </span> |
        <span className="wireItemDate">  {this.formattedDate(this.props.recommendedArticle.published_date)}
        </span> <br />
      <div className="newswireItemArticleTitle">
        {this.props.recommendedArticle.title}
      </div>
      <div className="imgAbstractFloat">
        <div className="wireImg">
          {this.props.recommendedArticle.media && this.props.recommendedArticle.media[0]["media-metadata"] &&
            <img src={this.props.recommendedArticle.media[0]["media-metadata"][0].url } alt=""  />
          }
        </div>
        <div className="wireItemAbstract">
          {this.props.recommendedArticle.abstract}
        </div>
      </div>
</div>
        </div>);
};}

export default RecommendedArticle;
