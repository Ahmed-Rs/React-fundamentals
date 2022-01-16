import Logo from './Logo.js'

function Title() {
  return (
    <div className="title">
      <h1>Our First Page</h1>
      <h2>Our Header</h2>
    </div>
  );
}

const Header = () => {
  return (
    <header className="header">
      <Title />
      <Logo />
      <div className="links">
        <a href="/">Home</a>
        <br />
        <a href="/create">New Blog</a>
      </div>
    </header>
  );
};

export default Header;
