import React, { Component } from 'react';

import 'isomorphic-fetch';
import './App.css';
import ArticleContainer from './components/ArticleContainer';
import ReadLaterContainer from './components/ReadLaterContainer';
import ReadNowContainer from './components/ReadNowContainer'

const URL = 'http://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=e7d46b3683014c88ade24365a40b3b93';

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
              articles: [...state.articles, newArt]
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
        if (!this.state.readLater.includes(art)) {
          this.setState({
              readLater: [...this.state.readLater, art],
          });
        }
    }



    handleReadArticle = (art) => {
      if (this.state.readLater.length < 15) {
        this.setState({
          readNow: [...this.state.readNow, art],
        });
        const win = window.open(art.url, '_blank');
        win.focus();
        if (this.state.readLater.includes(art)) {
          this.handleDeleteArticle
        }
      }
      else {
        alert("Looks like you've hit your limit of 15 free articles this month. Subscribe now for unlimited access to our content.")
      }
    }

    handleOpenArticle = (article) => {
      window.open(`${article.url}`, "_blank")
    }

    handleDeleteArticle = (article) => {
      const truncatedList = this.state.readLater
      truncatedList.splice(truncatedList.indexOf(article), 1)
      this.setState({
        readLater: truncatedList
      })
    }

    render() {
        return (
            <div className="news-wire-top wrapper">
            <div className="box header"><h1>NYTimes NewsWire</h1></div>
                <div className="news-wire content">
                    <h2 className="news-wire-title">Latest Articles from the New York Times</h2>
                    <ArticleContainer
                        articles={this.state.articles}
                        handleSaveArticleToReadLater={this.handleSaveArticleToReadLater} handleReadArticle={this.handleReadArticle} />
                </div>
          
                  <div className="read-later box sidebar">
                      <h4>Saved Articles</h4>

                      <ReadLaterContainer readLater={this.state.readLater} handleReadArticle={this.handleReadArticle} handleDeleteArticle={this.handleDeleteArticle}/>

                  </div>

                  <div className="read-now">
                      <h4 className="view-history">Viewing History</h4>

                      <ReadNowContainer readNow={this.state.readNow} />

                  </div>

            </div>
        );
    }
}

export default App;
