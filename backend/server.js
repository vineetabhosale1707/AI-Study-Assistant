import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import multer from "multer";
import { PDFParse } from "pdf-parse";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


let pdfText = "";


const upload = multer({
  storage: multer.memoryStorage(),
});


const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});


app.get("/", (req, res) => {
  res.send("Backend is running!");
});



app.post("/summary", upload.single("pdf"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        error: "No PDF uploaded",
      });
    }


    console.log("PDF received:", req.file.originalname);


    const parser = new PDFParse({
      data: req.file.buffer,
    });


    const pdfData = await parser.getText();


    const extractedText = pdfData.text;


    // Save PDF text for chatbot
    pdfText = extractedText;


    console.log(
      "Extracted text length:",
      extractedText.length
    );



    const response = await ai.chat.completions.create({

      model: "llama-3.1-8b-instant",


      messages: [
        {
          role: "user",

          content: `
You are an expert study assistant.

Analyze the PDF content and create a structured study summary.

IMPORTANT:
Return ONLY valid JSON.
Do not add markdown, code blocks, or extra explanation.

Use exactly this format:

{
  "overview": "Short introduction of the topic",

  "keyPoints": [
    "Important concept 1",
    "Important concept 2"
  ],

  "definitions": [
    {
      "term": "Term name",
      "meaning": "Simple meaning"
    }
  ],

  "examNotes": [
    "Important exam point 1",
    "Important exam point 2"
  ],

  "quickRevision": [
    "Quick revision point 1",
    "Quick revision point 2"
  ]
}

Keep the explanation simple and suitable for a college student.

PDF Content:

${extractedText}
`,
        },
      ],
    });



    const summaryData = JSON.parse(
      response.choices[0].message.content
    );


    res.json({
      summary: summaryData,
    });



  } catch (error) {

    console.error("SUMMARY ERROR:", error);


    res.status(500).json({
      error: error.message,
    });

  }

});





// ASK AI ABOUT PDF

app.post("/ask", async (req, res) => {

  try {

    const { question } = req.body;


    if (!pdfText) {

      return res.status(400).json({
        error: "Please upload a PDF first.",
      });

    }



    const response = await ai.chat.completions.create({

      model: "llama-3.1-8b-instant",


      messages: [
        {
          role: "user",

          content: `
You are an AI tutor.

Answer the student's question using only the uploaded PDF content.

Explain in simple language suitable for a college student.

PDF Content:

${pdfText}


Student Question:

${question}
`,
        },
      ],

    });



    res.json({

      answer: response.choices[0].message.content,

    });



  } catch (error) {

    console.error("ASK ERROR:", error);


    res.status(500).json({

      error: error.message,

    });

  }

});


// GENERATE MCQS FROM PDF

app.post("/mcq", async (req, res) => {

  try {


    if (!pdfText) {

      return res.status(400).json({
        error: "Please upload a PDF first."
      });

    }



    const response = await ai.chat.completions.create({

      model: "llama-3.1-8b-instant",


      messages: [

        {
          role: "user",

          content: `

You are an expert exam question creator.

Create 5 multiple choice questions from the uploaded PDF.

IMPORTANT:
Return ONLY valid JSON.
No markdown.
No extra explanation.

Use exactly this format:

{
 "mcqs":[
  {
   "question":"Question text",
   "options":[
    "A) option",
    "B) option",
    "C) option",
    "D) option"
   ],
   "answer":"Correct option"
  }
 ]
}


Make questions suitable for college students.

PDF Content:

${pdfText}

`

        }

      ]

    });



    const mcqData = JSON.parse(
      response.choices[0].message.content
    );



    res.json(mcqData);



  }
  catch(error){

    console.error("MCQ ERROR:", error);


    res.status(500).json({
      error:error.message
    });

  }


});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);

});