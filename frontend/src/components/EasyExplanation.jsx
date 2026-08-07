import { useState } from "react";
import { LightbulbIcon, SparkleIcon } from "./Icons";

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

    <div className="panel ws-card">

      <div className="card-heading">
        <span className="card-icon-circle">
          <LightbulbIcon size={18} />
        </span>
        <div>
          <h2>Easy Explanation</h2>
        </div>
      </div>

      <label className="explain-label">Topic Input</label>

      <div className="explain-input-row">

        <input
          type="text"
          placeholder="e.g. The Krebs Cycle"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button className="btn-primary" onClick={explainTopic}>
          <SparkleIcon size={15} />
          Explain
        </button>

      </div>

      <div className="explain-output">

        {loading ? (
          <>
            <h4>AI Explanation</h4>
            <p>🤖 AI is explaining...</p>
          </>
        ) : explanation ? (
          <>
            <h4>Explanation</h4>
            <p>{explanation}</p>
          </>
        ) : (
          <>
            <h4>AI Explanation</h4>
            <p>Enter a topic above and StudyMate will explain it in simple words.</p>
          </>
        )}

      </div>

    </div>

  );

}

export default EasyExplanation;
