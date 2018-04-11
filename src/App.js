import React, { Component } from 'react';
import { nytimes_key } from './ApiKeys'
import 'isomorphic-fetch';
import './App.css';
import ArticleContainer from './components/ArticleContainer';
import ReadLaterContainer from './components/ReadLaterContainer';
import ReadNowContainer from './components/ReadNowContainer'
import { Grid } from 'semantic-ui-react'

const URL = `http://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nytimes_key}`;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            readNow: [],
            readLater: [],
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
              articles: [newArt, ...state.articles]
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
      this.interval = setInterval(this.fetchArticles, 15000)
    }

    handleSaveArticleToReadLater = (art) => {
      let currentReadLaterState = this.state.readLater.slice(0)
        if (!this.state.readLater.includes(art)) {
          this.setState({
              readLater: [...currentReadLaterState, art],
          });
        }
    }



    handleReadArticle = (art) => {
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
      console.log(nytimes_key)
      return (
        <div className="news-wire-top wrapper">
          <div className="box header">NYTimes NewsWire</div>


        <div class="sidebar-and-feed">

          <div className="news-wire content">
            <h2 className="news-wire-title">Latest Articles from the New York Times</h2>
            <ArticleContainer
              articles={this.state.articles}
              handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} handleReadArticle={this.handleReadArticle} />
                </div>

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

        </div>
        </div>
      );
    }
  }

  export default App;
