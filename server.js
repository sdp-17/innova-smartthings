app.get('/', (req, res) => {
  res.send("Server SmartThings Fancoil INNOVA attivo!");
});

// Simula login cloud Innova
app.post('/auth', (req, res) => {
  // qui si può memorizzare un token temporaneo
  res.json({ token: "dummy-token" });
});

// Comando fancoil
app.post('/command', (req, res) => {
  const { action, value } = req.body;
  // es. action = "power", value = "on" oppure "temp", value = 22
  console.log(`Ricevuto comando: ${action} -> ${value}`);
  res.send(`Comando ricevuto: ${action} -> ${value}`);
});
