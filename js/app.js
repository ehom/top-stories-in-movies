var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HEADLINES = "https://raw.githubusercontent.com/ehom/external-data/master/nyt/movies.json";

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      source: {}
    };
    moment.locale(props.language);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch(HEADLINES).then(function (response) {
        return response.json();
      }).then(function (json_data) {
        console.debug("fetched: ", json_data);
        _this2.setState({
          source: json_data
        });
      }).catch(console.error);
    }
  }, {
    key: "render",
    value: function render() {
      console.debug("about to render...");

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: "jumbotron pt-4 pb-4" },
          React.createElement(
            "h1",
            { className: "display-5 page-title" },
            "Top Stories in ",
            this.state.source.section,
            React.createElement(
              "a",
              { href: "https://developer.nytimes.com/", className: "float-right" },
              React.createElement("img", { src: "https://developer.nytimes.com/files/poweredby_nytimes_200b.png?v=1583354208360" })
            )
          ),
          React.createElement(TodaysDate, { locale: this.props.language })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Headlines, { source: this.state.source.results })
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { language: navigator.language }), document.getElementById("app"));