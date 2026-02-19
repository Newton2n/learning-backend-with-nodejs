import express from "express";
import * as dotenv from "dotenv";
dotenv.config(); 
const app = express();
app.get("/", (req, res) => {
  res.send("server is ready");
});
app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Math Joke",
      content: "Why was the math book sad? Because it had too many problems.",
    },
    {
      id: 2,
      title: "Computer Joke",
      content: "Why don’t programmers like nature? It has too many bugs.",
    },
    {
      id: 3,
      title: "Food Joke",
      content: "Why don’t eggs tell jokes? They’d crack each other up.",
    },
    {
      id: 4,
      title: "Dog Joke",
      content: "What do you call a dog magician? A labracadabrador.",
    },
    {
      id: 5,
      title: "Work Joke",
      content:
        "Why did the scarecrow get promoted? Because he was outstanding in his field.",
    },
  ];

  res.send(jokes);
});
const port = process.env.PORT ||3000;
console.log(process.env.PORT)
app.listen(port, () => {
  console.log(`port is ready, listening at ${port}`);
});
