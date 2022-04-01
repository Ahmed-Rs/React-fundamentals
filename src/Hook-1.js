import * as React from "react";

// Usage du Lifting State Up && useEffect() avec Dépendances && useRef()

function Sport({ artMartial, onArtMartialChange }) {
  const handleChange = (e) => {
    onArtMartialChange(e.target.value);
  };

  return (
    <div>
      <label>Mon sport préféré est le :</label>
      <input type="text" onChange={handleChange} value={artMartial} />
    </div>
  );
}

function Intensity({ intensity, onIntensityChange }) {
  return (
    <div>
      L'intensité de ce sport est:
      <input
        type="text"
        onChange={(e) => onIntensityChange(e.target.value)}
        value={intensity}
      />
    </div>
  );
}

function Country({ country, onCountryChange }) {
  return (
    <div>
      Son pays d'origine est :{" "}
      <input
        type="text"
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
      />
    </div>
  );
}

// Usage useRef() qui color le countryBtn en rouge
function Content({ artMartial, country, intensity }) {
  const countryBtn = React.useRef(null);
  const onButtonClick = () => {
    countryBtn.current.style.color = 'red';
  };

  return (
    <div style={{ color: "lightgreen" }}>
      Votre sport préféré est le {artMartial}, qui a été mis au point dans le
      pays{" "}
      <button ref={countryBtn} onClick={onButtonClick}>
        {country}
      </button>
      , et dont l'intensité est {intensity}
    </div>
  );
}

function SportsHabit() {
  const [artMartial, setArtMartial] = React.useState(''); // Initialisation des States à ('') pour éviter l'affichage de l'erreur : A component is changing an uncontrolled input of type text to be controlled.
  const handleArtMartialChange = (artMartial) => setArtMartial(artMartial);

  const [country, setCountry] = React.useState('');
  const [intensity, setIntensity] = React.useState('');

  return (
    <div>
      <Sport
        artMartial={artMartial}
        onArtMartialChange={handleArtMartialChange}
      />
      <Country country={country} onCountryChange={setCountry} />
      <Intensity intensity={intensity} onIntensityChange={setIntensity} />
      <Content
        artMartial={artMartial}
        country={country}
        intensity={intensity}
      />
    </div>
  );
}

export default SportsHabit;
