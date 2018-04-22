import React from 'react';

class ArticleItem extends React.Component {

  constructor(props) {
    super(props)
  }

  handleReadLater = () => {
    this.props.handleSaveArticleToReadLater(this.props.article)
  }

  handleReadNow = () => {
    this.props.handleReadArticle(this.props.article)
  }

  render() {
    const articleDate = `${(new Date(this.props.article.updated_date)).getMonth() + 1}/${(new Date(this.props.article.updated_date)).getDate()}/${(new Date(this.props.article.updated_date)).getFullYear()}`;

    return (
      <div className="articleItemNewswire">
        <div className="articleItemInfo">
          <div className="newsWireButtons">
            <span className="button read-now">
              <button onClick={this.handleReadNow} className="readNow"><i className="material-icons">open_in_new</i></button>
            </span>
            <span className="button read-later">
              <button onClick={this.handleReadLater} className="readLater"><i className="material-icons">collections_bookmark</i></button>
            </span>

          </div>
          <span className="wireItemSection">{this.props.article.section}</span> | <span className="wireItemDate">{articleDate}</span>
          <h3 className="newswireItemArticleTitle">{this.props.article.title}</h3>
          <div className="imgAbstractFloat">
            <div className="wireImg">
              {this.props.article.multimedia &&
                <img src={this.props.article.multimedia[0].url} alt=""  />
              }
            </div>
            <div className="wireItemAbstract">
              {this.props.article.abstract}
            </div>
          </div>


        </div>


        </div>);
};}

export default ArticleItem;
