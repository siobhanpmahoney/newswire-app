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
        <div className="readNowButtons">
          <span className="buttonReadNow saved"><button onClick={this.handleReadNow} className="readNow"><i className="material-icons">open_in_new</i></button></span>
          <span className="button delete"><button onClick={this.deleteArticle} className="delete"><i className="material-icons">delete_forever</i></button></span>
        </div><br />
        <span className="readLaterInfo" style={{fontFamily:"Open Sans"}}>{this.props.readLaterArticle.section} | {this.formattedDate(this.props.readLaterArticle.updated_date)}</span><br />
        <span className="readLaterArticleTitle">{this.props.readLaterArticle.title}</span>

    </div>
  )

}
}

export default ReadLaterArticles;
