import { useState } from "react";
import { ChatIcon, SendIcon } from "./Icons";

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

    <div className="panel ws-card">

      <div className="card-heading">
        <span className="card-icon-circle">
          <ChatIcon size={18} />
        </span>
        <div>
          <h2>Chat with PDF</h2>
        </div>
      </div>

      {loading ? (
        <div className="chat-display">
          <h3>AI Answer</h3>
          <p>⏳ AI is thinking...</p>
        </div>
      ) : answer ? (
        <div className="chat-display">
          <h3>AI Answer</h3>
          <p>{answer}</p>
        </div>
      ) : (
        <div className="chat-display is-placeholder">
          <p>Ask a question about your PDF to get an AI answer.</p>
        </div>
      )}

      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e)=>setQuestion(e.target.value)}
        />

        <button onClick={askQuestion}>
          <SendIcon size={16} />
        </button>

      </div>

    </div>

  );

}

export default ChatBot;
