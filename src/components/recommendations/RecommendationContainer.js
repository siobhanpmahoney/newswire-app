import React from 'react'
import { nytimes_key } from '../../ApiKeys'
import 'isomorphic-fetch';
import RecommendedArticleItem from './RecommendedArticleItem'
import RecommendationList from './RecommendationList'




class RecommendationContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recommendedArticles: []
    }
  }

  componentDidMount() {

    for (let i of this.props.likedSections) {
      let currentState = this.state.recommendedArticles.slice(0)
      fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/${i}/7.json?api-key=${nytimes_key}`)
     .then(response => response.json())
     .then(json => this.setState({
        recommendedArticles: [...currentState, json.results]
       // recommendedArticles: Object.assign({},
       //   currentState,
       //   {
       //     [i]: json.results
           // [i]: [...currentState[i] || [], json.results]
       //   }
       // )
     }))
  }
  this.startInterval()
}

fetchRecommendedArticles = () => {
  let currentState = this.state.recommendedArticles.slice(0)
  console.log("currentState", currentState)

  for (let i of this.props.likedSections) {
    console.log("section of choice", i)
    let url = `https://api.nytimes.com/svc/mostpopular/v2/mostviewed/${i}/7.json?api-key=${nytimes_key}`
    fetch(url)
      .then(response=> response.json())
      .then(json => json.results.slice(0, 10).map((newArt) => {
      if (!this.state.recommendedArticles.find((a) => a.title === newArt.title) && !this.props.articles.find((feed) => feed.title === newArt.title)) {
        this.setState((state, props) => {
          return {
          recommendedArticles: [newArt,...state.recommendedArticles]
        }
          // recommendedArticles: Object.assign({},
          //   currentState, {
              // [i]: [...currentState[i], json.results]
               // i: json.results
          //   }
          // )
        })
      }
    }))
  }

  console.log("fetched", this.state.recommendedArticles)
}



startInterval = () => {
  this.interval = setInterval(this.fetchRecommendedArticles, 12000)
}


  // fetchArticlesBySection = (section) => {
  //    fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/${section}/7.json?api-key=${nytimes_key}`)
  //   .then(response => response.json())
  //   .then(json =>  json.results)
  // }



  render () {
    console.log("in recs", this.state.recommendedArticles)
    console.log("in recs", this.props)

    return (
      <div className="rec-wrapper">

      <span className="readLaterHeader"> Recommended Reading</span>
        {this.props.likedSections.map((s) => {
          return <RecommendationList section={s} recommendedArticles={this.state.recommendedArticles.filter((a) => a.section == s)} readLater={this.props.readLater} handleSaveArticleToReadLater={this.props.handleSaveArticleToReadLater}  handleReadArticle={this.props.handleReadArticle} />
        })}


      </div>
    )
  }
}

export default RecommendationContainer
