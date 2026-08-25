import { useState } from "react";
import wordsCSV from "./spelling_words.csv?raw";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [result, setResult] = useState("");

  const words = wordsCSV
    .split("\n")
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .slice(1);

  const getRandomWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    console.log(newWord);
    return newWord;
  };

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);

    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const newWord = (e) => {
    e.preventDefault();
    let word = getRandomWord();
    setWord(word);
    speakWord(word);
  };

  const checkWord = (guess: string) => {
    if (guess == word) {
      setResult("CORRECT");
    } else {
      setResult("INCORRECT");
    }
  };

  return (
    <>
      <div className="mainContainer">
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
        />
        <button onClick={() => checkWord(inputWord)}>SUBMIT</button>
        <div>
          <button onClick={(e) => newWord(e)}>NEW WORD</button>
        </div>
        <div>
          <h1>{result}</h1>
        </div>
      </div>
    </>
  );
}

export default App;
