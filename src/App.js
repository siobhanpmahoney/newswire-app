import React, { Component } from 'react';
import { nytimes_key } from './ApiKeys'
import 'isomorphic-fetch';
import ls from 'local-storage'
import './App.css';
import ArticleContainer from './components/ArticleContainer';
import ReadLaterContainer from './components/ReadLaterContainer';
import ReadNowContainer from './components/ReadNowContainer'
import RecommendationContainer from './components/recommendations/RecommendationContainer'


const URL = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nytimes_key}`;

// var ls = require('local-storage')

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            readNow: [],
            readLater: [],
            likedSections: [],
            articleWireType: "latest",
        };
    }

    componentDidMount() {
        fetch(URL)
          .then(response => response.json())
          .then(json => this.setState({
            articles: json.results,
            readNow: ls.get('readNow') || [],
            readLater: ls.get('readLater') || [],
            likedSections: ls.get('likedSections') || [],
            articleWireType: "latest",
          }));
        this.startInterval()
    }

    fetchArticles = () => {
      fetch(URL)
        .then(response=> response.json())
        .then(json => json.results.map((newArt) => {
        if (!this.state.articles.find((a) => a.title === newArt.title)) {
          this.setState((state, props) => {
            return {
              articles: [newArt,... state.articles]
            }
          })
        }
      }))
      console.log("fetched" + this.state.articles.length)
    }

    addNewToState = (articles) => {
      articles.filter((a) => !this.state.articles.includes(a))
    }

    startInterval = () => {
      this.interval = setInterval(this.fetchArticles, 6000)
    }

    handleSaveArticleToReadLater = (art) => {
      debugger
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
        console.log(this.state.readNow.length)
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

    renderFeedType = () => {
      if (this.state.articleWireType === "latest") {
        return (

              <ArticleContainer articles={this.state.articles} readLater={this.state.readLater} handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} handleReadArticle={this.handleReadArticle} />

          )
      } else {
        return ( <RecommendationContainer articles={this.state.articles} readNow={this.state.readNow} readLater={this.state.readLater} likedSections={this.state.likedSections} handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} handleReadArticle={this.handleReadArticle}/>

      )
      }
    }

    toggleFeedType = (event) => {
      let v = event.target.value
      this.setState({
        articleWireType: v
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
      console.log(this.state.readNow.length)
      console.log("likedSections", this.state.likedSections)
      console.log(nytimes_key)
      return (
        <div className="news-wire-top wrapper">
          <div className="header"><span className="header-text">NYTimes NewsWire</span></div>

        <div className="toggle-feed-buttons">
          <button className="toggle-feed" id={this.toggleButtonId("latest")} onClick={this.toggleFeedType} value="latest">Latest</button>  | <button className="toggle-feed"  id={this.toggleButtonId("recommended")} onClick={this.toggleFeedType}  value="recommended">Recommendations</button>
          </div>

        <div className="app-container">
          <div className="sidebar">
            <div className="readLaterSection">
              <span className="readLaterHeader">Saved Articles</span>

              <ReadLaterContainer readLater={this.state.readLater} handleReadArticle={this.handleReadArticle} handleDeleteArticle={this.handleDeleteArticle}/>
            </div>

            <div className="readNowSection">
              <span className="viewHistoryHeader">Viewing History</span>
              {this.state.readNow.length >= 1 &&
                <ReadNowContainer readNow={this.state.readNow} />
              }
            </div>
          </div>

            {this.renderFeedType()}



        </div>


        </div>
      );
    }
  }

  export default App;
