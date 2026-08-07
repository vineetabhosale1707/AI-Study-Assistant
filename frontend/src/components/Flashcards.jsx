import { useState } from "react";
import { LayersIcon, SparkleIcon } from "./Icons";

function Flashcards() {

  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState({});

  async function generateFlashcards() {

    setLoading(true);

    try {

      const response = await fetch("http://localhost:5000/flashcards", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setFlashcards(data.flashcards);
        localStorage.setItem(
  "flashcardCount",
  data.flashcards.length
);
      } else {
        alert(data.error);
      }

    } catch (error) {

      console.error(error);
      alert("Could not connect to backend.");

    }

    setLoading(false);

  }

  function flipCard(index) {

    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

  }

  return (

    <div className="panel ws-card">

      <div className="card-heading">
        <span className="card-icon-circle">
          <LayersIcon size={18} />
        </span>
        <div>
          <h2>Flashcards</h2>
        </div>
      </div>

      <button className="btn-primary" onClick={generateFlashcards}>
        <SparkleIcon size={15} />
        Generate Flashcards
      </button>

      {loading && <p className="tool-placeholder">🤖 AI is creating flashcards...</p>}

      {!loading && flashcards.length === 0 && (
        <p className="tool-placeholder">Click-to-flip cards will appear here.</p>
      )}

      {flashcards.length > 0 && (
        <div className="flashcards-container">

          {flashcards.map((card, index) => (

            <div
              key={index}
              className="flashcard"
              onClick={() => flipCard(index)}
            >

              {!flipped[index] ? (
                <>
                  <h3>Question</h3>
                  <p>{card.front}</p>
                  <small>Click to Flip</small>
                </>
              ) : (
                <>
                  <h3>Answer</h3>
                  <p>{card.back}</p>
                  <small>Click to Flip Back</small>
                </>
              )}

            </div>

          ))}

        </div>
      )}

    </div>

  );

}

export default Flashcards;
