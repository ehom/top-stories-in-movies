const CORS_ANYWHERE = (url) => {
  return `https://cors-anywhere.herokuapp.com/${url}`;
};

const HEADLINES = CORS_ANYWHERE('https://us-central1-ehom-nyt-demo.cloudfunctions.net/fetch-news');

((url) => {
  fetch(url)
    .then(response => response.json())
    .then((json_data) => {
      console.debug(json_data);
      ReactDOM.render(<App data={json_data} />, document.getElementById('app'));
    })
    .catch(console.error);
})(HEADLINES);

function App(properties) {
  moment.locale(navigator.language);
  const articles = Helper.processArticles(properties.data.results);

  return (
    <React.Fragment>
      <div className="jumbotron pt-4 pb-4">
        <h1 className="display-5 page-title">Top Stories in {properties.data.section}
          <a href="https://developer.nytimes.com/" className="float-right">
            <img src="https://developer.nytimes.com/files/poweredby_nytimes_200b.png?v=1583354208360" />
          </a>
        </h1>
        <TodaysDate />
        </div>
      <div className="row">{articles}</div>
    </React.Fragment>
  );
}

function TodaysDate() {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  };
  
  const today = new Intl.DateTimeFormat(navigator.language, options).format(new Date());
  return (
    <React.Fragment>{today}</React.Fragment>
  );
}

const Helper = {
  processArticles: (articles) => {
    const getThumbnail = (article) => {
      const lastImage = article.multimedia.length - 1;
      return article.multimedia ? article.multimedia[lastImage].url: "";
    };
    
    const calcHowLongAgo = (now, article) => {
      const past = moment(new Date(article.updated_date));
      return past.from(now);
    };
    
    const now = moment(new Date());
    
    const processed = articles.map((article) => {
      const image = getThumbnail(article);
      const howLongAgo = calcHowLongAgo(now, article);

      return (
        <div className="card col-sm-4 mb-3">
          <div class="imageContainer">
            <img className="card-img-top" src={image} alt="" />
          </div>
          <div className="card-body">
            <p className="card-text">
              <a href={article.url} target="_blank">
                {article.title}
              </a>
            </p>
            <p className="card-text">{article.abstract}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li className="list-group-item">{howLongAgo}</li>
          </ul>
        </div>
      );
    });
    return processed;
  }
};
