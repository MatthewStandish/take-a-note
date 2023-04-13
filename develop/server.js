const express = require("express");
const uniqid = require("uniqid");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/notes", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "db.json"))
  );
  res.json(data);
});

app.post("/api/notes", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "db.json"))
  );
  const newNote = {
    id: uniqid(),
    title: req.body.title,
    text: req.body.text,
  };
  data.push(newNote);
  fs.writeFileSync(path.join(__dirname, "db", "db.json"), JSON.stringify(data));
  res.json(data);
});
