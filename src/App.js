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
            likedSections: []
        };
    }

    componentDidMount() {
        fetch(URL)
          .then(response => response.json())
          .then(json => this.setState({
            articles: json.results,
            readNow: ls.get('readNow') || [],
            readLater: ls.get('readLater') || [],
            likedSections: ls.get('likedSections') || []
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
        alert("Looks like you've hit your limit of 15 free articles this month. Subscribe now for unlimited access to our content.")
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


dynamicIcon = (art) => {
  if (this.state.readLater.find((a) => {
    return a.title == art.title
  })) {
    return (<i className="material-icons">bookmark</i>)
  } else {
    return (<i className="material-icons" onClick={this.handleSaveArticleToReadLater(art)}>bookmark_border</i>)
  }
}



    render() {
      console.log(this.state.readNow.length)
      console.log("likedSections", this.state.likedSections)
      console.log(nytimes_key)
      return (
        <div className="news-wire-top wrapper">
          <div className="box header"><span className="header-text">NYTimes NewsWire</span></div>


        <div class="sidebar-and-feed">

          <div className="read-later box sidebar">
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

          <div className="news-wire content">
            <h2 className="news-wire-title">Latest Articles from the New York Times</h2>
            <ArticleContainer
              articles={this.state.articles}
              handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} handleReadArticle={this.handleReadArticle} />
                </div>




            <div className="recommendedContainer">
              <RecommendationContainer articles={this.state.articles} readNow={this.state.readNow} readLater={this.state.readLater} likedSections={this.state.likedSections} handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} dynamicIcon={this.dynamicIcon} handleReadArticle={this.handleReadArticle}/>
            </div>

        </div>
        </div>
      );
    }
  }

  export default App;
