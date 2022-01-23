import * as React from "react";

// Lifting State Up
function EmailInput({ email, handleEmailChange }) {
  const handleChange = (e) => {
    handleEmailChange(e.target.value);
  };
  return (
    <label htmlFor="email">
      <input type="text" value={email} onChange={handleChange} />
      {/* En temps normal, lors de l'usage d'un State, on transfert la value {email} vers setEmail
      mais ici nous ferons de même, mais le set est dans le Composant supérieur
      grâce à handleEmailChange et newEMail.
      Ce transfert nous permet de déplacer le React.useState vers le composant supérieur */}
    </label>
  );
}

function PhoneInput({ phoneNumber, handlePhoneChange }) {
  const handleChange = (e) => {
    handlePhoneChange(e.target.value);
  };

  return (
    <label htmlFor="email">
      <input type="text" value={phoneNumber} onChange={handleChange} />
    </label>
  );
}

function LocationInput({ location, handleLocationChange }) {
  const handleChange = (e) => {
    handleLocationChange(e.target.value);
  };

  return (
    <label htmlFor="location">
      <input type="text" value={location} onChange={handleChange} />
    </label>
  );
}

const Contact = () => {
  const [email, setEmail] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [location, setLocation] = React.useState();

  // ourNewEmail == e.target.value
  // handleEmailChange() == newEMail()
  function newEmail(ourNewEmail) {
    setEmail(ourNewEmail);
  }
  function newPhoneNumber(ourNewPhone) {
    setPhoneNumber(ourNewPhone);
  }

  function newLocation(ourNewLocation) {
    setLocation(ourNewLocation);
  }

  return (
    <div>
      <form>
        <EmailInput email={email} handleEmailChange={newEmail} />
        <PhoneInput
          phoneNumber={phoneNumber}
          handlePhoneChange={newPhoneNumber}
        />
        <LocationInput location={location} handleLocationChange={newLocation} />
      </form>
      <p style={{ color: "white" }}>
        Hello your mail is {email}, your phone number is {phoneNumber} and you
        live in {location}
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-title">
        <h1>References</h1>
      </div>
      <Contact />
    </div>
  );
};

export default Footer;
