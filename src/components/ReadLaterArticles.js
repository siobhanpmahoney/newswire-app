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

  render() {
    return (
      <div className="readLaterArticleItem">
        <span className="readLaterArticleTitle">{this.props.readLaterArticle.title}</span>
        <div className="readNowButtons">
          <span className="buttonReadNow"><button onClick={this.handleReadNow}>Read Now</button></span>
          <span className="button delete"><button onClick={this.deleteArticle}>Delete</button></span>
        </div>
    </div>
  )

}
}

export default ReadLaterArticles;
