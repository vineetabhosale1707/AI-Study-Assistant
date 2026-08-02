import { useState } from "react";

function EasyExplanation() {

  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  async function explainTopic() {

    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);
    setExplanation("");

    try {

      const response = await fetch("http://localhost:5000/explain", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          topic: topic,
        }),

      });

      const data = await response.json();

      if (response.ok) {
        setExplanation(data.explanation);
      } else {
        alert(data.error);
      }

    } catch (error) {

      console.error(error);
      alert("Could not connect to backend.");

    }

    setLoading(false);

  }

  return (

    <div className="explanation-section">

      <h2>💡 Easy Explanation</h2>

      <input
        type="text"
        placeholder="Enter a topic from your PDF..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <br /><br />

      <button onClick={explainTopic}>
        Explain
      </button>

      {loading && (
        <p>🤖 AI is explaining...</p>
      )}

      {explanation && (

        <div className="summary-section">

          <h3>Explanation</h3>

          <p>{explanation}</p>

        </div>

      )}

    </div>

  );

}

export default EasyExplanation;