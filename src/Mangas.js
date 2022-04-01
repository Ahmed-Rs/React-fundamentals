import * as React from "react";

function PokemonResearcher({ pokemonQuery = "pikachu" }) {
  const [data, setData] = React.useState("");
  const [moreData, setMoreData] = React.useState([]);
  const [spriteData, setSpriteData] = React.useState('');
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    if (!pokemonQuery) {
      return null;
    }
    // setData(null)
    // setError(null) A éviter car on risque de ne pas récupérer de données.
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
        setMoreData(info.forms[0]);
        setSpriteData(info.sprites)
      })
      .catch((err) => {
        setError(err);
      });
  }, [pokemonQuery]);

  console.log(data);
  console.log(moreData);
  console.log(spriteData);

  if (error) {
    // throw error;
    return null;
  }

  return (
    <div>
      <p>
        Your pokemon name is : {data.name} and he has {moreData.name}{" "}
        as abilities
      </p>
      <div className="poke-img">
        <img src={spriteData.front_shiny} alt="front_shiny_img" />
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
    <div>
      <label htmlFor="">Enter Manga Name</label>
      <input
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
