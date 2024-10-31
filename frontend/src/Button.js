import React from "react";

function Button({ id, translationRef, handleSubmit, value }) {
  return (
    <button onClick={(e) => handleSubmit(id, translationRef, value)}>
      Submit
    </button>
  );
}

export default Button;
