import React from "react";
import Translation from "./Translation";

function Translations({ translations, translationRef, handleSubmit }) {
  return translations.map((translation) => {
    return (
      <Translation
        key={translation.id}
        translation={translation}
        translationRef={translationRef}
        handleSubmit={handleSubmit}
      />
    );
  });
}

export default Translations;
