// import React, { useState, useRef, useEffect } from "react";
import React, { useState } from "react";
import Translations from "./Translations";
import "./App.css";

// const defaultWords = [
const defaultTranslations = [
  { id: "1", eng: "Bear", fin: "Karhu" },
  { id: "2", eng: "Eagle", fin: "Kotka" },
  { id: "3", eng: "Wolf", fin: "Susi" },
];

function App() {
  // const [words] = useState(defaultWords);
  // const [translations, setTranslations] = useState(defaultWords);
  const [translations] = useState(defaultTranslations);
  // const translationRef = useRef();

  // function handleSubmit(translationRef) {
  //   const translation = translationRef.current.value;
  //   if (translation === "") return;
  //   setTranslations((prevTranslations) => {
  //     return [
  //       ...prevTranslations,
  //       { id: 9, eng: translation, fin: translation },
  //     ];
  //   });
  //   translationRef.current.value = null;
  // }

  // useEffect(() => {
  //   fetchTranslations();
  // }, []);

  // const fetchTranslations = async () => {
  //   const data = await fetch("http://localhost:8080/animal");
  //   // const data = await fetch("https://translation-game.herokuapp.com/animal");
  //   const translations = await data.json();
  //   setTranslations(translations.translations);
  // };

  return (
    <div className="App">
      <h1>Translation Game</h1>
      {/* <Translations translations={translations} translationRef={translationRef} handleSubmit={handleSubmit} /> */}
      <Translations translations={translations} />
    </div>
  );
}

export default App;
