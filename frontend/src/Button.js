import React from "react";

// function Button(translationRef, handleSubmit) {
function Button() {
  // TÄMÄ RIVI POISSA VANHASTA
  function handleOnClick() {}
  // return <button onClick={handleSubmit(translationRef)}>Submit</button>;
  return <button onClick={handleOnClick}>Submit</button>;
}

export default Button;
