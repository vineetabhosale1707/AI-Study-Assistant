import { useState } from "react";

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

    <div className="flashcard-section">

      <h2>🃏 Flashcards</h2>

      <button onClick={generateFlashcards}>
        Generate Flashcards
      </button>

      {loading && <p>🤖 AI is creating flashcards...</p>}

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

    </div>

  );

}

export default Flashcards;