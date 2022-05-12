import * as React from "react";
import Inscription from "./SignUp";
import SportsHabit from "./Hook-1";
import GlobalResearcher from "./MyApiSearch";
import PokemonApp from "./Pokemon";
import PokemonApp2 from "./Pokemon-2";

// CONTAINER
const Container = ({
  className,
  children,
  backgroundColor,
  color,
  size,
  style,
}) => {
  return (
    <div
      className={`container container--${size} container--${className}`}
      style={{
        backgroundColor: `${backgroundColor}`,
        color: `${color}`,
        fontSize: `${size}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const smallContainer = (
  <Container
    size={"small"}
    backgroundColor={"rgb(103, 50, 170)"}
    color={"white"}
    border={"5px solid black"}
    children={"Hello Everyone"}
  ></Container>
);

const mediumContainer = (
  <Container size="medium" backgroundColor="rgb(03, 103, 170)" color="white">
    <div>
      <ul>
        <li>Eins</li>
        <li>Zwei</li>
        <li>Drei</li>
        <li>Fier</li>
        <li>cinq</li>
        <li>Six</li>
      </ul>
    </div>
  </Container>
);

const largeContainer = (
  <Container size="large" backgroundColor="rgb(103, 103, 70)" color="white">
    <div>
      <ul>
        <li>UN</li>
        <li>DEUX</li>
        <li>TROIS</li>
        <li>QUATRE</li>
        <li>CINQ</li>
        <li>SIX</li>
      </ul>
    </div>
  </Container>
);

// OBJETS SYSTEMES D'EXPLOITATION
const myObjects = [
  { id: "1", value: "iOS" },
  { id: "2", value: "Liunx" },
  { id: "3", value: "Ubuntu" },
  { id: "opérateur", value: "IBM" },
];

function MesObjets() {
  const [objets, setObjets] = React.useState(myObjects);
  const addObjet = () => {
    setObjets([...objets, { id: "système", value: "Windows" }]);
  };

  return (
    <div>
      <ul>
        {objets.map((objet) => (
          <li key={objet.id}>{objet.value}</li>
        ))}
      </ul>
      <button onClick={addObjet}>Ajouter Objet</button>
    </div>
  );
}

function Calculator({ nb1, nb2, operation, style, ftStyle }) {
  const opName = operation.name;
  const [resultat, setResultat] = React.useState();
  const [nombre1, setNombre1] = React.useState(nb1);
  const [nombre2, setNombre2] = React.useState(nb2);

  const handleClick = (a = nb1, b = nb2) => {
    if (a instanceof Object) {
      a = nb1;
    }
    setNombre1(a);
    setNombre2(b);
    setResultat(operation(a, b));
  };
  return (
    <div style={{ color: "white", fontStyle: `${ftStyle}`, ...style }}>
      <input type="button" value={`Calculer ${opName}`} onClick={handleClick} />
      <input
        type="button"
        value={`Calculer ${opName}`}
        onClick={() => handleClick(30, 40)}
      />
      {resultat
        ? `Le resultat de ${opName} de ${nombre1} et ${nombre2} est ${resultat}`
        : null}
    </div>
  );
}

// const multiplication = (a, b) => a * b;
const exponent = (a, b) => a * Math.exp(b);

// HOC
const withBlueModifier = (WrappedContent) => {
  return function (props) {
    return <WrappedContent color={"blue"} {...props} />; // On rajoute le {...props} pour pouvoir ajouter des props au choix, lors de l'appel final au composant <BlueButton />
  };
};

// On déclare le Button normalement, on lui définit des props, puis dans le HOC, on donne des valeurs à ces props, et l'appel au HOC avec le Button en param, lui fera injecter les valeurs.
// Le HOC prend en param un component et le restitue après lui avoir injecté des valeurs à travers les props.
const Button = (props) => {
  return (
    <button
      style={{ color: props.color, cursor: props.cursor, ...props.style }}
      {...props}
    >
      Colorize
    </button>
  );
};

const BlueButton = withBlueModifier(Button);

const Home = () => {
  return (
    <div className="home">
      <PokemonApp />
      <PokemonApp2 />
      {/* {smallContainer}
      {mediumContainer}
      {largeContainer} */}
      {/* <MesObjets />
      <Inscription /> */}
      {/* <Calculator
        style={{ fontSize: "30px" }}
        ftStyle={"italic"}
        nb1={3}
        nb2={5}
        operation={multiplication}
      />
      <Calculator ftStyle={"oblique"} nb1={1} nb2={2} operation={exponent} /> */}
      {/* <Calculator nb1={4} nb2={7} operation={exponent} /> */}
      {/* <BlueButton cursor={"pointer"} /> */}
      {/* <SportsHabit /> */}
      {/* <GlobalResearcher /> */}
    </div>
  );
};

export default Home;
