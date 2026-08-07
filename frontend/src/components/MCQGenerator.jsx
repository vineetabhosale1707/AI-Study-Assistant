import { useState } from "react";
import { ListChecksIcon, SparkleIcon } from "./Icons";

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

    <div className="panel ws-card">

      <div className="card-heading">
        <span className="card-icon-circle">
          <ListChecksIcon size={18} />
        </span>
        <div>
          <h2>MCQ Generator</h2>
        </div>
      </div>

      <button className="btn-primary" onClick={generateMCQs}>
        <SparkleIcon size={15} />
        Create MCQs
      </button>

      {loading && (
        <p className="tool-placeholder">🤖 AI is creating MCQs...</p>
      )}

      {!loading && mcqs.length === 0 && (
        <p className="tool-placeholder">Generated MCQs will appear here.</p>
      )}

      {mcqs.length > 0 && (
        <div className="mcq-list">
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
      )}

    </div>

  );

}

export default MCQGenerator;
