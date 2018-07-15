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
      return (<i className="material-icons bookmark" style={{color:"#79cac6"}}>bookmark</i>)
    } else {
      return (<i className="material-icons bookmark_border" style={{color:"#79cac6"}} onClick={this.handleReadLater}>bookmark_border</i>)
    }
  }

  render() {
    console.log(this.props.recommendedArticle)

    const articleDate = `${(new Date(this.props.recommendedArticle.updated_date)).getMonth() + 1}/${(new Date(this.props.recommendedArticle.updated_date)).getDate()}/${(new Date(this.props.recommendedArticle.updated_date)).getFullYear()}`;

    return (
      <div className="wire-item-container-block-wrapper">
        <div className="wire-item-container">
          <div className="wire-item-all-text">
            <div className="wire-item-section">
              {this.props.recommendedArticle.section}
            </div>

            <div className="wire-item-title" onClick={this.handleReadNow}>
              {this.props.recommendedArticle.title}
            </div>

            <div className="wire-item-abstract">
              {this.props.recommendedArticle.abstract}
            </div>

            <div className="wire-item-bottom">
              <div className="wire-item-date">
                {this.formattedDate(this.props.recommendedArticle.published_date)}
              </div>

              <span className="wire-item-buttons">

                <button className="readLater">
                  {this.dynamicIcon()}
                </button>

              </span>
            </div>

          </div>
          <div className="wire-item-img-section">
            {this.props.recommendedArticle.media && this.props.recommendedArticle.media[0]["media-metadata"] &&
              <img className="wire-item-img" src={this.props.recommendedArticle.media[0]["media-metadata"][1].url } alt=""  />
            }
          </div>
        </div>

      </div>
    )
  }
}

export default RecommendedArticle;
