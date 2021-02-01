const Helper = {
  processArticles: (articles) => {
    const getThumbnail = (article) => {
      const lastImage = article.multimedia.length - 1;
      return article.multimedia ? article.multimedia[lastImage].url : "";
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

const Headlines = ({ source }) => {
  console.debug("source:", source);

  let articles = null;
  if (source) {
    articles = Helper.processArticles(source);
  }
  return <React.Fragment>{articles}</React.Fragment>;
};

const TodaysDate = ({ locale }) => {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  };

  const today = new Intl.DateTimeFormat(locale, options).format(new Date());
  return <React.Fragment>{today}</React.Fragment>;
};

