import React, { Component } from 'react';
import { nytimes_key } from './ApiKeys'
import 'isomorphic-fetch';
import ls from 'local-storage'
import './App.css';
import ArticleContainer from './components/ArticleContainer';
import ReadLaterContainer from './components/ReadLaterContainer';
import ReadNowContainer from './components/ReadNowContainer'
import RecommendationContainer from './components/recommendations/RecommendationContainer'


const LATEST_URL = `https://content.api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nytimes_key}`;

const REC_URL = (section) => `https://content.api.nytimes.com/svc/mostpopular/v2/mostviewed/${section}/7.json?api-key=${nytimes_key}`

// var ls = require('local-storage')

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latestArticles: [],
      recommendedArticles: [],
      readNow: [],
      readLater: [],
      likedSections: [],
      articleWireType: "latest",
    };
  }

  componentDidMount() {
    fetch(LATEST_URL)
    .then(response => response.json())
    .then(json => this.setState({
      latestArticles: json.results,
      readNow: ls.get('readNow') || [],
      readLater: ls.get('readLater') || [],
      likedSections: ls.get('likedSections') || [],
      articleWireType: "latest",
    }));
    this.startInterval(this.fetchArticles)

  }

  fetchArticles = () => {
    fetch(LATEST_URL)
    .then(response=> response.json())
    .then(json => json.results.map((newArt) => {
      if (!this.state.latestArticles.find((a) => a.title === newArt.title)) {
        this.setState((state, props) => {
          return {
            latestArticles: [newArt,... state.latestArticles]
          }
        })
      }
    }))

  }

  fetchRecommendedArticles = () => {
    let currentState = this.state.recommendedArticles.slice(0)

    for (let sec of this.state.likedSections) {
      fetch(REC_URL(sec))
        .then(response=> response.json())
        .then(json => json.results.slice(0, 10).map((newArt) => {
        if (!this.state.recommendedArticles.find((a) => a.title === newArt.title) && !this.state.latestArticles.find((feed) => feed.title === newArt.title)) {
          this.setState((state, props) => {
            return {
            recommendedArticles: [newArt,...state.recommendedArticles]
          }
          })
        }
      }))
    }
  }

  addNewToState = (articles, articleState) => {
    articles.filter((a) => !this.state[articleState].includes(a))
  }

  startInterval = (fetchArticleFunction) => {
    this.interval = setInterval(fetchArticleFunction, 10000)
  }

  handleSaveArticleToReadLater = (art) => {
    let currentReadLaterState = this.state.readLater.slice(0)
    let currentLikedSections = this.state.likedSections.slice(0)
    let newReadLaterState = [...currentReadLaterState, art]
    if (!this.state.readLater.includes(art)) {
      this.setState({
        readLater: newReadLaterState,
      });
      ls.set('readLater', newReadLaterState)
    }
    if (!this.state.likedSections.includes(art.section)) {
      const newLikedSections = [...currentLikedSections, art.section];
      this.setState({
        likedSections: newLikedSections
      })
      ls.set('likedSections', newLikedSections);
    }

  }



  handleReadArticle = (art) => {
    let currentLikedSections = this.state.likedSections.slice(0)
    let newLikedSections = [...currentLikedSections, art.section]
    if (!this.state.likedSections.includes(art.section)) {
      this.setState({
        likedSections: newLikedSections
      })
      ls.set('likedSections', newLikedSections)
    }
    if (this.state.readNow.length < 15) {
      let readNow = [...this.state.readNow, art];
      this.setState({
        readNow: readNow,
      });
      ls.set('readNow', readNow)
      if (this.state.readLater.find((article) => article.title === art.title)) {
        this.handleDeleteArticle(art)
      }
      const win = window.open(art.url, '_blank');
      win.focus();
    }
    else {

      alert("Looks like you've hit your limit of 15 free articles this month. Please sign up for one of the subscription options offered by the Times.")
    }

  }

  handleOpenArticle = (article) => {
    window.open(`${article.url}`, "_blank")
  }

  handleDeleteArticle = (article) => {
    const truncatedList = this.state.readLater.slice(0)
    truncatedList.splice(truncatedList.indexOf(article), 1)
    this.setState({
      readLater: truncatedList
    })
    ls.set('readLater', truncatedList)
  }

  renderFeedComponent = () => {
    if (this.state.articleWireType === "latest") {
      this.fetchArticles
      return (

        <ArticleContainer articles={this.state.latestArticles} fetchArticles={this.fetchArticles} startInterval={this.startInterval} readLater={this.state.readLater} handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} handleReadArticle={this.handleReadArticle} />

      )
    } else {
    this.fetchRecommendedArticles

      return ( <RecommendationContainer fetchRecommendedArticles={this.fetchRecommendedArticles} recommendedArticles={this.state.recommendedArticles} readNow={this.state.readNow} readLater={this.state.readLater} likedSections={this.state.likedSections} handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} handleReadArticle={this.handleReadArticle} startInterval={this.startInterval}/>

    )
  }
}


toggleFeedType = (event) => {
  let v = event.target.value
  this.setState({
    articleWireType: v,
  })
}

toggleButtonId = (type) => {
  if (this.state.articleWireType === type) {
    return "active"
  } else {
    return "inactive"
  }
}





render() {
  return (
    <div className="news-wire-top wrapper">
      <div className="header"><span className="header-text">NYTimes NewsWire</span></div>



      <div className="app-container">
        <div className="sidebar">
          <div className="readLaterSection">
            <div className="readLaterHeader">Saved Articles</div>

            <ReadLaterContainer readLater={this.state.readLater} handleReadArticle={this.handleReadArticle} handleDeleteArticle={this.handleDeleteArticle}/>
          </div>

          <div className="readNowSection">
            <span className="viewHistoryHeader">Viewing History</span>
            {this.state.readNow.length >= 1 &&
              <ReadNowContainer readNow={this.state.readNow} />
            }
          </div>
        </div>

        <div className="article-section">
          <div className="toggle-feed-buttons">
            <button className="toggle-feed" id={this.toggleButtonId("latest")} onClick={this.toggleFeedType} value="latest">Latest</button>

          <span className="vl"></span>

            <button className="toggle-feed"  id={this.toggleButtonId("recommended")} onClick={this.toggleFeedType}  value="recommended">Recommended</button>
          </div>

          {this.renderFeedComponent()}

        </div>





      </div>


    </div>
  );
}
}

export default App;
