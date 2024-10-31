import React, { useState } from "react";
import Button from "./Button";

function Translation({ handleSubmit, indicator, translation }) {
  const [value, setValue] = useState();

  const changeInputField = (e) => {
    setValue(e.target.value);
  };

  let visibility = "none";
  if (indicator === translation.id) visibility = "inline";

  return (
    <label>
      <div>{translation.eng}</div>
      <div style={{ display: visibility }}>CORRECT!</div>
      <br />
      <input
        onChange={changeInputField}
        style={{ display: "block", margin: "auto" }}
        type="text"
      />
      <br />
      <Button handleSubmit={handleSubmit} id={translation.id} value={value} />
      <br />
      <br />
    </label>
  );
}

export default Translation;
