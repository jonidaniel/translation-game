import React from "react";
import Translation from "./Translation";

function Translations({ handleSubmit, indicator, translations }) {
  return translations.map((translation) => {
    return (
      <Translation
        handleSubmit={handleSubmit}
        indicator={indicator}
        // Each child in a list should have a unique 'key' prop
        key={translation.id}
        translation={translation}
      />
    );
  });
}

export default Translations;
