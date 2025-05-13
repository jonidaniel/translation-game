import React, { useState } from "react";
import Button from "./Button";

function Translation({ handleSubmit, indicator, translation }) {
  const [value, setValue] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  let visibility = "none";
  // Show correct text if an answer is correct
  if (indicator === translation.id) {
    visibility = "inline";
  }

  return (
    <label>
      <div>{translation.eng}</div>
      <div style={{ display: visibility }}>CORRECT!</div>
      <br />
      <input
        onChange={handleChange}
        style={{ display: "block", margin: "auto" }}
        type="text"
      />
      <Button handleSubmit={handleSubmit} id={translation.id} value={value} />
      <br />
      <br />
    </label>
  );
}

export default Translation;
