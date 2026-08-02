import { useState } from "react";

function MCQGenerator() {

  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);

  async function generateMCQs() {

    setLoading(true);

    try {

      const response = await fetch("http://localhost:5000/mcq", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {

        setMcqs(data.mcqs);

        // Update total MCQs generated
        const total = Number(localStorage.getItem("mcqCount") || 0);

        localStorage.setItem(
          "mcqCount",
          total + data.mcqs.length
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

  return (

    <div className="mcq-section">

      <h2>❓ Generate MCQs</h2>

      <button onClick={generateMCQs}>
        Create MCQs
      </button>

      {loading && (
        <p>🤖 AI is creating MCQs...</p>
      )}

      {mcqs.map((mcq, index) => (

        <div
          key={index}
          className="mcq-card"
        >

          <h3>
            {index + 1}. {mcq.question}
          </h3>

          {mcq.options.map((option, i) => (

            <p key={i}>
              {option}
            </p>

          ))}

          <strong>
            Answer: {mcq.answer}
          </strong>

        </div>

      ))}

    </div>

  );

}

export default MCQGenerator;