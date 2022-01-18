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

const myObjects = [
  { id: "fruits", value: "Orange" },
  { id: "saison", value: "Hiver" },
  { id: "tel", value: "Apple" },
  { id: "opérateur", value: "Sfr" },
];

function MesObjets() {
  return (
    <div>
      <ul>
        {myObjects.map((myObject) => (
          <li key={myObject.id}>{myObject.value}</li>
        ))}
      </ul>
    </div>
  );
}

const Home = () => {
  return (
    <div className="home">
      <h1>App Component</h1>
      {smallContainer}
      {mediumContainer}
      {largeContainer}
      <MesObjets />
    </div>
  );
};

export default Home;
