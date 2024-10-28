import React from "react";
import Translation from "./Translation";

// function Translations({ translations, translationRef, handleSubmit }) {
function Translations({ translations }) {
  return translations.map((translation) => {
    // return <Translation key={translation.id} translation={translation} translationRef={translationRef} handleSubmit={handleSubmit} />;
    return <Translation key={translation.id} translation={translation} />;
  });
}

export default Translations;
