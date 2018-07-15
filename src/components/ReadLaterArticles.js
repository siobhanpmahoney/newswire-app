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
        <div className="readLaterArticleItemContent">




          <div className="readLaterArticleTop">
            <div className="readLaterArticleSection">
              {this.props.readLaterArticle.section}
            </div>
                    <div className="readLaterArticleButtons">
                      <button onClick={this.handleReadNow} className="readLaterArticleReadNowButton">
                        <i className="material-icons">open_in_new</i>
                    </button>

                      <button onClick={this.deleteArticle} className="readLaterArticleDeleteButton">
                        <i className="material-icons">delete_forever</i>
                      </button>
                    </div>
</div>


          <div className="readLaterArticleTitle">
            {this.props.readLaterArticle.title}
          </div>

          <div className="readLaterArticleDate">
            {this.formattedDate(this.props.readLaterArticle.updated_date)}
          </div>



        </div>
      </div>
    )

  }
}

export default ReadLaterArticles;
