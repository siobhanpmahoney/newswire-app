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

  dynamicIcon = () => {

    if (this.props.readLater.find((a) => {
      return a.title == this.props.article.title
    })) {
      return (<i className="material-icons bookmark" style={{color:"#79cac6"}}>bookmark</i>)
    } else {
      return (<i className="material-icons bookmark_border" style={{color:"#79cac6"}} onClick={this.handleReadLater}>bookmark_border</i>)
    }
  }

  render() {
    const articleDate = `${(new Date(this.props.article.updated_date)).getMonth() + 1}/${(new Date(this.props.article.updated_date)).getDate()}/${(new Date(this.props.article.updated_date)).getFullYear()}`;

    return (
      <div className="wire-item-container-block-wrapper">
      <div className="wire-item-container">
        <div className="wire-item-all-text">
        <div className="wire-item-section">{this.props.article.section}</div>
          <div className="wire-item-title" onClick={this.handleReadNow}>
            {this.props.article.title}
          </div>
          <div className="wire-item-abstract">
            {this.props.article.abstract}
          </div>
          <div className="wire-item-bottom">
            <div className="wire-item-date">{articleDate}</div>
          <span className="wire-item-buttons">




              <button className="readLater">{this.dynamicIcon()}</button>


          </span>
          </div>
</div>
<div className="wire-item-img-section">

{this.props.article.multimedia &&
  <img src={this.props.article.multimedia[1].url} alt="" className="wire-item-img" />
}


</div>




</div>


        </div>);
      };}

      export default ArticleItem;
