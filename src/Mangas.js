import * as React from "react";

function PokemonResearcher({ pokemonQuery = "pikachu" }) {
  const [data, setData] = React.useState("");
  const [moreData, setMoreData] = React.useState([]);
  const [spriteData, setSpriteData] = React.useState([]);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    // setData(null);
    // setError(null); // A éviter car on risque de ne pas récupérer de données.
    if (!pokemonQuery) {
      return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`, {
      method: "GET",
      redirect: "follow",
      // mode: 'cors',
      headers: {
        // "X-Api-Key": "25835002-2618-40f1-b7ba-05f7e9c0417e",
        // "content-type": "application/json",
        // 'Accept': 'application/json'
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setData(info); // Ne pas confondre le 'data' de setData et le 'data' qui nous est retourné par l'API
        setMoreData(info.abilities);
        setSpriteData(info.sprites);
      })
      .catch((err) => {
        setError(err);
      });
  }, [pokemonQuery]);

  // console.log(data);
  // console.log(moreData);
  console.log(spriteData);

  if (error) {
    // throw error;
    return null;
  }

  return (
    <div>
      <p>
        Your pokemon name is : {data.name} and he has {moreData.length}{" "}
        abilities
      </p>
      <div className="pokemon-img">
        <img src={spriteData["front_shiny"]} alt="" />
      </div>
    </div>
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
      Invalid Pokemon Name
      <pre>Details : {error.message}</pre>
    </div>
  );
}

function PokemonApp() {
  const [pokemonName, setPokemonName] = React.useState("pikachu");

  return (
    <div className="pokemon-section">
      <label htmlFor="" className="pokemon-label">
        Enter Manga Name
      </label>
      <input
        className="pokemon-input"
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <ErrorBoundary key={setPokemonName} ErrorDisp={ErrorDisplay}>
        <PokemonResearcher pokemonQuery={pokemonName} />
      </ErrorBoundary>
    </div>
  );
}

export default PokemonApp;
