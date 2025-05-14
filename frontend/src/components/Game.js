import React, { useEffect, useState } from "react";
import Header from "./Header";
import Translations from "./Translations";
// import Translation from "./Translation";
import Footer from "./Footer";
import "../style-sheets/Game.css";

function Game() {
  const [translations, setTranslations] = useState([]);
  const [indicator, setIndicator] = useState();

  function handleSubmit(id, value) {
    let correct = translations.find(
      (item) => item.fin === value && item.id === id
    );
    if (correct) {
      setIndicator(id);
      postGuess(correct.fin);
    } else {
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
      // const data = await fetch("https://translation-game.herokuapp.com/animal");
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
    <div className="Game">
      <Header />
      <Translations
        handleSubmit={handleSubmit}
        indicator={indicator}
        translations={translations}
      />
      {/* <Translation
        handleSubmit={handleSubmit}
        indicator={indicator}
        translations={translations}
      /> */}
      <Footer />
    </div>
  );
}

export default Game;
