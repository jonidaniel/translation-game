import React, { useEffect, useState } from "react";
import Translations from "./Translations";
import "./App.css";

function App() {
  const [translations, setTranslations] = useState([]);
  const [indicator, setIndicator] = useState();

  function handleSubmit(id, value) {
    let correct = translations.find(
      (item) => item.fin === value && item.id === id
    );
    if (correct) {
      console.log(`${correct.eng} = ${correct.fin}, correct! `);
      setIndicator(id);
      postGuess(correct.fin);
    } else {
      let animal = translations.find((item) => item.id === id);
      console.log(`${animal.eng} != ${value}, incorrect! `);
      if (value) postGuess(value);
    }
  }

  const postGuess = async (guess) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fin: guess }),
    };

    try {
      await fetch("http://localhost:8080/guess", requestOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTranslations = async () => {
    try {
      const data = await fetch("http://localhost:8080/animal");
      const translations = await data.json();
      setTranslations(translations);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  return (
    <div className="App">
      <h1>Translation Game</h1>
      <Translations
        handleSubmit={handleSubmit}
        indicator={indicator}
        translations={translations}
      />
    </div>
  );
}

export default App;
