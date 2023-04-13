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

app.delete("/api/notes/:id", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "db.json"))
  );
  const filteredData = data.filter((note) => note.id !== req.params.id);
  fs.writeFileSync(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(filteredData)
  );
  res.json(filteredData);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
