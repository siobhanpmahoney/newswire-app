# React Container Components

## Overview
In this lab, we will practice building container components. By the end of the lab you will have:
1. Practiced Building Container Components.
2. Gained concrete experience combining presentational and container components to separate the data and presentation layers.

## Oh, To Be a Critic!
![Thumbs Down](https://s3.amazonaws.com/ezmiller/public/images/thumbs-down-kevin.gif)

Movie critics can be harsh, but it's a blast to read what they write. For this lab, imagine that you've been hired to work on a web application devoted to movie reviews. The app will draw its review content from the _New York Times_, which has provided a public, queryable API for their content.

For your part, you've been asked to produce two container components that will wrap a single presentation component, `<MovieReviews>`, which lists a series of movie reviews on the page.

The two container components you've been asked to create will use this single presentational component in different ways. The first, `<LatestMovieReviewsContainer>`, will fetch a list of the most recent reviews and display them. The second, `<SearchableMovieReviewsContainer>`, will provide a searchable interface allowing the user to enter a search term and then receive a list of reviews that match the search term(s).

You can tackle these components in whatever order you wish, but it might make sense to start with the more static (and thus simpler) `<LatestMovieReviewsContainer>`. As with other labs, you can use the tests as a specification for the components, but here are the main points that you should follow as you work:

#### `<MovieReviews>`
* Your `MovieReviews` component should be stateless and functional.
* You are free to lay out each review as you like using the data that the API returns, but make sure that the component outputs a top-level element with the class `review-list` and that each review is wrapped by an element with class `review`.

#### `<LatestMovieReviewsContainer>` and `<SearchableMovieReviewsContainer>`
* Both container components should be class components that maintain state.
* The `LatestMovieReviewsContainer` should have a top-level wrapping element with class `latest-movie-reviews`.
* the `SearchableMovieReviewsContainer` should have a top-level wrapping element with class `searchable-movie-reviews`.

## The _New York Times_ API
In order to fetch data from the _New York Times_ API, you'll need to make calls to the following URLs:

* For the latest movie reviews: `https://api.nytimes.com/svc/movies/v2/reviews/all.json`
* To query the search API: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=<search-term>`

In addition to making calls to these URLs, you will need to request an API key from [here](https://developer.nytimes.com/signup). Once you have the key, you will "sign" your requests by attaching the key to the URL like so:
```
https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=<your key here>
```

For fetching from the API, make sure to use [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch), which provides a particularly nice API.

For further information about the _New York Times_ Movie Reviews API — including a sandbox where you can view the data that the API returns — please consult [their documentation](http://developer.nytimes.com/movie_reviews_v2.json#/Documentation/GET/reviews/search.json).

## Resources

- [Container Components](https://medium.com/@learnreact/container-components-c0e67432e005#.2kd1wuyp4)
- [CSS Tricks: Container Components](https://css-tricks.com/learning-react-container-components/)
- [_New York Times_ Movie Reviews API Documentation](http://developer.nytimes.com/movie_reviews_v2.json#/Documentation)

<p class='util--hide'>View <a href='https://learn.co/lessons/react-container-components-lab'>Container Components Lab</a> on Learn.co and start learning to code for free.</p>
# newswire-app
