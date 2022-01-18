import * as React from "react";

function Inscription() {
  return (
    <form action="">
      <label>Nom: </label>
      <input type="text" name="nom" placeholder="Enter your name" />
      <label>Prénom: </label>
      <input type="text" name="prénom" placeholder="Enter your Nick Name" />
      <label>Mail Adress</label>
      <input type="mail" name="mail" placeholder="Enter your Mail Address" />
      <label>Password</label>
      <input type="text" name="password" placeholder="Enter your password" />
    </form>
  );
}

export default Inscription;
