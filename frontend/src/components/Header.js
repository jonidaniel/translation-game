import React from "react";
import "../style-sheets/Header.css";

function Header() {
  return (
    <div className="Header">
      <h1>Translation Game</h1>
      <br />
      <p>How well do you know the creatures of land, sea and air ???</p>
      <p>Try to translate these animal words from English to Finnish !!!</p>
      <p>You get 1 point for every correct translation !!!</p>
      <br />
      <br />
    </div>
  );
}

export default Header;
