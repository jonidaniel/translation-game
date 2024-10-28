import React from "react";
import Button from "./Button";

// function Translation(translation, translationRef, handleSubmit) {
function Translation({ translation }) {
  return (
    <label>
      <div>{translation.eng}</div>
      <div>{translation.fin}</div>
      {/* <input ref={translationRef} type="text" /> */}
      <input type="text" />
      {/* <Button translationRef={translationRef} handleSubmit={handleSubmit} /> */}
      <Button />
    </label>
  );
}

export default Translation;
