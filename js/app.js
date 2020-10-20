var CORS_ANYWHERE = function CORS_ANYWHERE(url) {
  return 'https://cors-anywhere.herokuapp.com/' + url;
};

var HEADLINES = CORS_ANYWHERE('https://us-central1-ehom-nyt-demo.cloudfunctions.net/fetch-news');

(function (url) {
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (json_data) {
    console.debug(json_data);
    ReactDOM.render(React.createElement(App, { data: json_data }), document.getElementById('app'));
  }).catch(console.error);
})(HEADLINES);

// TODO
// Put the string in application string resource
document.title = "Top Stories in Movies";

function App(properties) {
  moment.locale(navigator.language);
  var articles = Helper.processArticles(properties.data.results);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'jumbotron pt-4 pb-4' },
      React.createElement(
        'h1',
        { className: 'display-5 page-title' },
        'Top Stories in ',
        properties.data.section,
        React.createElement(
          'a',
          { href: 'https://developer.nytimes.com/', className: 'float-right' },
          React.createElement('img', { src: 'https://developer.nytimes.com/files/poweredby_nytimes_200b.png?v=1583354208360' })
        )
      ),
      React.createElement(TodaysDate, null)
    ),
    React.createElement(
      'div',
      { className: 'row' },
      articles
    )
  );
}

function TodaysDate() {
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  };

  var today = new Intl.DateTimeFormat(navigator.language, options).format(new Date());
  return React.createElement(
    React.Fragment,
    null,
    today
  );
}

var Helper = {
  processArticles: function processArticles(articles) {
    var getThumbnail = function getThumbnail(article) {
      var lastImage = article.multimedia.length - 1;
      return article.multimedia ? article.multimedia[lastImage].url : "";
    };

    var calcHowLongAgo = function calcHowLongAgo(now, article) {
      var past = moment(new Date(article.updated_date));
      return past.from(now);
    };

    var now = moment(new Date());

    var processed = articles.map(function (article) {
      var image = getThumbnail(article);
      var howLongAgo = calcHowLongAgo(now, article);

      return React.createElement(
        'div',
        { className: 'card col-sm-4 mb-3' },
        React.createElement(
          'div',
          { 'class': 'imageContainer' },
          React.createElement('img', { className: 'card-img-top', src: image, alt: '' })
        ),
        React.createElement(
          'div',
          { className: 'card-body' },
          React.createElement(
            'p',
            { className: 'card-text' },
            React.createElement(
              'a',
              { href: article.url, target: '_blank' },
              article.title
            )
          ),
          React.createElement(
            'p',
            { className: 'card-text' },
            article.abstract
          )
        ),
        React.createElement(
          'ul',
          { 'class': 'list-group list-group-flush' },
          React.createElement(
            'li',
            { className: 'list-group-item' },
            howLongAgo
          )
        )
      );
    });
    return processed;
  }
};