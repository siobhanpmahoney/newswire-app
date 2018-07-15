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


                      <button onClick={this.deleteArticle} className="readLaterArticleDeleteButton">
                        <i class="material-icons" style={{color:"#8D8D8D"}}>
close
</i>
                      </button>
                    </div>
</div>


          <div className="readLaterArticleTitle">
            <a onClick={this.handleReadNow} className="readLaterArtictleTitleAnchor">
              {this.props.readLaterArticle.title}</a>
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
