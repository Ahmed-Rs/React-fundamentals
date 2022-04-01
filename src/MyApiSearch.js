import * as React from "react";

function Explorer({ movieQuery = "london" }) {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // if (!movieQuery) {
    //   return
    // }
    fetch(`https://hn.algolia.com/api/v1/search?query=${movieQuery}`)
      .then((response) => response.json())
      .then((json) => setData(json.hits))
      .catch((error) => setError(error));
  }, [movieQuery]);
  console.log(data);

  if (error) {
    throw error;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    const { ErrorDisp } = this.props;
    if (this.state.error) {
      return <ErrorDisp error={this.state.error} />;
    }
    return this.props.children;
  }
}

function ErrorDisplay({ error }) {
  return (
    <div style={{ color: "orange" }}>
      An error occured, please restart.
      <pre>Details: {error.message}</pre>
    </div>
  );
}

function GlobalResearcher() {
  const [searchText, setSearchText] = React.useState("");

  return (
    <div>
      <label>Enter the movie name</label>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ErrorBoundary key={searchText} ErrorDisp={ErrorDisplay}>
        <Explorer movieQuery={searchText} />
      </ErrorBoundary>
    </div>
  );
}

export default GlobalResearcher;
