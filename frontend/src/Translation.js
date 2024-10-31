import React, { useState } from "react";
import Button from "./Button";

function Translation({ translation, translationRef, handleSubmit }) {
  const [value, setValue] = useState();

  const changeInputField = (e) => {
    setValue(e.target.value);
  };

  return (
    <label>
      <div>{translation.eng}</div>
      <input onChange={changeInputField} ref={translationRef} type="text" />
      <Button
        id={translation.id}
        translationRef={translationRef}
        handleSubmit={handleSubmit}
        value={value}
      />
    </label>
  );
}

export default Translation;
