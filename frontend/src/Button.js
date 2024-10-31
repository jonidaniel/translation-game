import React from "react";

function Button({ handleSubmit, id, value }) {
  return <button onClick={() => handleSubmit(id, value)}>Submit</button>;
}

export default Button;
