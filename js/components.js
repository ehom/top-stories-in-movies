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
        "div",
        { className: "card col-sm-4 mb-3" },
        React.createElement(
          "div",
          { "class": "imageContainer" },
          React.createElement("img", { className: "card-img-top", src: image, alt: "" })
        ),
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "p",
            { className: "card-text" },
            React.createElement(
              "a",
              { href: article.url, target: "_blank" },
              article.title
            )
          ),
          React.createElement(
            "p",
            { className: "card-text" },
            article.abstract
          )
        ),
        React.createElement(
          "ul",
          { "class": "list-group list-group-flush" },
          React.createElement(
            "li",
            { className: "list-group-item" },
            howLongAgo
          )
        )
      );
    });
    return processed;
  }
};

var Headlines = function Headlines(_ref) {
  var source = _ref.source;

  console.debug("source:", source);
  if (source) {
    var articles = Helper.processArticles(source);
    return React.createElement(
      React.Fragment,
      null,
      articles
    );
  }
  return React.createElement(React.Fragment, null);
};

var TodaysDate = function TodaysDate(_ref2) {
  var locale = _ref2.locale;

  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  };

  var today = new Intl.DateTimeFormat(locale, options).format(new Date());
  return React.createElement(
    React.Fragment,
    null,
    today
  );
};