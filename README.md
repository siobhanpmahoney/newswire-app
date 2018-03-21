# NYTimes NewsWire

New York Times article feed with real-time updates, read history tracker, and bookmarking tool.

## Usage and Features

* Live feed of NYTimes content that updates every 30 seconds with article details, including full story link, title, section, and abstract
* Tracks and renders viewing history
* Bookmarking tool that captures and renders information each saved item
* Automatically updates "Saved Articles" and "Viewing History" lists accordingly as viewers access saved articles
* Prevents article duplication in "Saved Articles"

## Prerequisites

### Frontend:
* React
* Isomorphic-Fetch API

### APIs

* #### _New York Times_ API

In order to fetch data from the _New York Times_ API, you'll need to make calls to the following URL: `http://api.nytimes.com/svc/news/v3/content/all/all.json`

In addition to making calls to these URLs, you will need to request an API key from [here](https://developer.nytimes.com/signup). Once you have the key, you will "sign" your requests by attaching the key to the URL like so:
```
http://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=<your key here>
```

For further information about the _New York Times_ Newswire API — including a sandbox where you can view the data that the API returns — please consult [their documentation](https://developer.nytimes.com/timeswire_v3.json#/Documentation/GET/content.json).

* #### Isomorphic-Fetch API
For fetching from the API, make sure to use [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch),

## Installing

After cloning this repo, navigate into the directory in terminal and run the following:

```
npm install
```

[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch):

```
npm install --save isomorphic-fetch es6-promise
```

## License

The MIT License (MIT)

Copyright (c) 2018 Siobhan Mahoney

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
