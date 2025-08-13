const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint di test
app.get("/", (req, res) => {
  res.send("Server SmartThings Fancoil INNOVA attivo!");
});

// Endpoint per lo stato del fancoil
app.get("/status", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});
