import { useState } from "react";

function ChatBot() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);


  async function askQuestion() {

    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setAnswer("");

    try {

      const response = await fetch("http://localhost:5000/ask", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: question,
        }),

      });


      const data = await response.json();


      if (response.ok) {
        setAnswer(data.answer);
      }
      else {
        setAnswer(data.error);
      }


    } catch (error) {

      setAnswer("Unable to connect to AI.");

    }


    setLoading(false);

  }


  return (

    <div className="chatbot-container">

      <h2>🤖 Ask AI About Your PDF</h2>


      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Ask something about your notes..."
          value={question}
          onChange={(e)=>setQuestion(e.target.value)}
        />


        <button onClick={askQuestion}>
          Ask
        </button>

      </div>


      {loading && (
        <div className="chat-answer">
          ⏳ AI is thinking...
        </div>
      )}


      {answer && (
        <div className="chat-answer">

          <h3>AI Answer</h3>

          <p>{answer}</p>

        </div>
      )}

    </div>

  );

}

export default ChatBot;