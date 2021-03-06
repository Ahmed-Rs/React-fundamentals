import * as React from "react";
import Logo from "./Logo.js";

function Title() {
  return (
    <div className="title">
      <h1>Welcome to Pokemon Generator</h1>
      <h2>API Based Researcher</h2>
    </div>
  );
}

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/">Home</a>
      <br />
      <a href="/">New Blog</a>
      <br />
      <a href="/">Contacts</a>
      <br />
      <a href="/">Sign In</a>
      <br />
      <a href="/">Sign Up</a>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Title />
      <Navbar />
    </header>
  );
};

export default Header;
