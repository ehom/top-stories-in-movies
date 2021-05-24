const APP_NAME = "Top Stories in Movies";

const HEADLINES =
  "https://raw.githubusercontent.com/ehom/external-data/master/nyt/movies.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: {}
    };
    moment.locale(props.language);
  }

  componentDidMount() {
    const storage = window.sessionStorage;

    if (storage.getItem('headlines')) {
      let data = storage.getItem('headlines');

      console.debug("use cache");
      this.setState({
        source: JSON.parse(data)
      });
    } else {
      fetch(HEADLINES)
      .then((response) => response.json())
      .then((json_data) => {
        console.debug("fetched: ", json_data);
        storage.setItem('headlines', JSON.stringify(json_data));
        this.setState({
          source: json_data
        });
      })
      .catch(console.error);
    }
  }

  render() {
    console.debug("about to render...");

    return (
      <React.Fragment>
        <div className="jumbotron pt-4 pb-4">
          <h1 className="display-5 page-title">
            Top Stories in {this.state.source.section}
            <a href="https://developer.nytimes.com/" className="float-right">
              <img src="https://developer.nytimes.com/files/poweredby_nytimes_200b.png?v=1583354208360" />
            </a>
          </h1>
          <TodaysDate locale={this.props.language} />
        </div>
        <div className="row">
          <Headlines source={this.state.source.results} />
        </div>
      </React.Fragment>
    );
  }
}

document.title = APP_NAME;

ReactDOM.render(
  <App language={navigator.language} />,
  document.getElementById("app")
);

