import React from 'react';

class ReadLaterArticles extends React.Component {

  constructor(props) {
    super(props)
  }

  handleReadNow = () => {
    this.props.handleReadArticle(this.props.readLaterArticle)
  }

  deleteArticle = () => {
    this.props.handleDeleteArticle(this.props.readLaterArticle)
  }

  formattedDate = (date) => {
    let pubDate = new Date(date)
    return pubDate.toLocaleDateString()
}

  render() {
    return (
      <div className="readLaterArticleItem">
        <span className="readLaterInfo" style={{fontFamily:"PT Serif"}}>{this.props.readLaterArticle.section} | {this.formattedDate(this.props.readLaterArticle.updated_date)}</span>
        <span className="readLaterArticleTitle">{this.props.readLaterArticle.title}</span>
        <div className="readNowButtons">
          <span className="buttonReadNow"><button onClick={this.handleReadNow} className="readNow">Read Now</button></span>
          <span className="button delete"><button onClick={this.deleteArticle} className="delete">Delete</button></span>
        </div>
    </div>
  )

}
}

export default ReadLaterArticles;
