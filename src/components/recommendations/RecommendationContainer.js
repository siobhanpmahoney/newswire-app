import React from 'react'
import { nytimes_key } from '../../ApiKeys'
import 'isomorphic-fetch';
import RecommendedArticleItem from './RecommendedArticleItem'
import RecommendationList from './RecommendationList'




class RecommendationContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      recommendedArticles: []
    }
  }

  componentDidMount() {
    this.props.fetchRecommendedArticles()
    this.props.startInterval(this.props.fetchRecommendedArticles)
  }


//   componentDidMount() {
//
//     for (let i of this.props.likedSections) {
//       let currentState = this.state.recommendedArticles.slice(0)
//       fetch(`https://content.api.nytimes.com/svc/mostpopular/v2/mostviewed/${i}/7.json?api-key=${nytimes_key}`)
//      .then(response => response.json())
//      .then(json => this.setState({
//         recommendedArticles: [...currentState, json.results],
//         loading: false
//        // recommendedArticles: Object.assign({},
//        //   currentState,
//        //   {
//        //     [i]: json.results
//            // [i]: [...currentState[i] || [], json.results]
//        //   }
//        // )
//      }))
//   }
//   this.startInterval()
// }

// fetchRecommendedArticles = () => {
//   let currentState = this.state.recommendedArticles.slice(0)
//
//
//   for (let i of this.props.likedSections) {
//     console.log("section of choice", i)
//     let url = `https://content.api.nytimes.com/svc/mostpopular/v2/mostviewed/${i}/7.json?api-key=${nytimes_key}`
//     fetch(url)
//       .then(response=> response.json())
//       .then(json => json.results.slice(0, 10).map((newArt) => {
//       if (!this.state.recommendedArticles.find((a) => a.title === newArt.title) && !this.props.articles.find((feed) => feed.title === newArt.title)) {
//         this.setState((state, props) => {
//           return {
//           recommendedArticles: [newArt,...state.recommendedArticles]
//         }
//           // recommendedArticles: Object.assign({},
//           //   currentState, {
//               // [i]: [...currentState[i], json.results]
//                // i: json.results
//           //   }
//           // )
//         })
//       }
//     }))
//   }
//
//   console.log("fetched", this.state.recommendedArticles)
// }



startInterval = () => {
  this.interval = setInterval(this.fetchRecommendedArticles, 5000)
}


  // fetchArticlesBySection = (section) => {
  //    fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/${section}/7.json?api-key=${nytimes_key}`)
  //   .then(response => response.json())
  //   .then(json =>  json.results)
  // }



  render () {

    if (this.props.likedSections.length == 0) {
      return <h3>Save or view articles from the Latest feed to get recommendations!</h3>
    }
    else if (this.props.likedSections && !this.props.likedSections[0]) {
      return <div>Loading...</div>
    } else {

    return (
      <div className="wire-container">

      <h2 className="news-wire-title"> Recommended Reading</h2>
        {this.props.likedSections.map((s) => {
          return <RecommendationList
            section={s}
            recommendedArticles={this.props.recommendedArticles.filter((a) => a.section == s)}
            readLater={this.props.readLater}
            handleSaveArticleToReadLater={this.props.handleSaveArticleToReadLater}
            handleReadArticle={this.props.handleReadArticle} />
        })}


      </div>
    )
  }
  }
}

export default RecommendationContainer
