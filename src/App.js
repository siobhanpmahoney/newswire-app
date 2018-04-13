import React, { Component } from 'react';
import { nytimes_key } from './ApiKeys'
import 'isomorphic-fetch';
import './App.css';
import ArticleContainer from './components/ArticleContainer';
import ReadLaterContainer from './components/ReadLaterContainer';
import ReadNowContainer from './components/ReadNowContainer'
import RecommendationContainer from './components/recommendations/RecommendationContainer'


const URL = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nytimes_key}`;

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
          .then(json => this.setState({ articles: json.results }));
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
      this.interval = setInterval(this.fetchArticles, 1000)
    }

    handleSaveArticleToReadLater = (art) => {
      let currentReadLaterState = this.state.readLater.slice(0)
      let currentLikedSections = this.state.likedSections.slice(0)
        if (!this.state.readLater.includes(art)) {
          this.setState({
              readLater: [...currentReadLaterState, art],
          });
        }
        {!this.state.likedSections.includes(art.section) &&
          this.setState({
            likedSections: [...currentLikedSections, art.section]
          })
        }
    }



    handleReadArticle = (art) => {
      let currentLikedSections = this.state.likedSections.slice(0)
      {!this.state.likedSections.includes(art.section) &&
        this.setState({
          likedSections: [...currentLikedSections, art.section]
        })
      }
      if (this.state.readNow.length < 15) {

        let readNow = [...this.state.readNow, art];
        this.setState({
          readNow: readNow,
        });


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
              <RecommendationContainer articles={this.state.articles} readNow={this.state.readNow} readLater={this.state.readLater} likedSections={this.state.likedSections} handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} handleReadArticle={this.handleReadArticle}/>
            </div>

        </div>
        </div>
      );
    }
  }

  export default App;
