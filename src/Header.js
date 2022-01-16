import Logo from "./Logo.js";

function Title() {
  return (
    <div className="title">
      <h1>Our First Page</h1>
      <h2>Our Header</h2>
    </div>
  );
}

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/">Home</a>
      <br />
      <a href="/create">New Blog</a>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <Title />
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
