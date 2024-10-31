import React, { useEffect, useRef, useState } from "react";
import Translations from "./Translations";
import "./App.css";

const defaultWords = [
  { id: 1, eng: "Bear", fin: "Karhu" },
  { id: 2, eng: "Eagle", fin: "Kotka" },
  { id: 3, eng: "Wolf", fin: "Susi" },
];

function App() {
  // const [words] = useState(defaultWords);
  const [translations, setTranslations] = useState(defaultWords);
  const translationRef = useRef();

  function handleSubmit(id, translationRef, value) {
    if (id === 1) console.log("1: " + value);
    if (id === 2) console.log("2: " + value);
    if (id === 3) console.log("3: " + value);

    // const translation = translationRef.current.value;
    // if (translation === "") return;
    // setTranslations((prevTranslations) => {
    //   return [
    //     ...prevTranslations,
    //     { id: 9, eng: translation, fin: translation },
    //   ];
    // });
    // translationRef.current.value = null;
  }

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      const data = await fetch("http://localhost:8080/animal"); // 3306
      // const data = await fetch("https://translation-game.herokuapp.com/animal");
      const translations = await data.json();
      console.log(translations);
      // setTranslations(translations.translations);
      setTranslations(translations);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>Translation Game</h1>
      <Translations
        translations={translations}
        translationRef={translationRef}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
