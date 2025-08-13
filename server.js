const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Stato simulato del fancoil
let fancoilState = {
  power: 'off',
  temperature: 22,
  setpoint: 24
};

// --- ENDPOINT /status ---
app.get('/status', (req, res) => {
  res.json(fancoilState);
});

// --- ENDPOINT /auth ---
app.get('/auth', (req, res) => {
  // Qui SmartThings verrà rediretto al login Innova (simulato)
  res.send('Redirecting to Innova login...');
});

// --- ENDPOINT /callback ---
app.get('/callback', (req, res) => {
  // Qui il server riceve il callback dopo login
  res.send('Callback ricevuta! Integrazione SmartThings pronta.');
});

// --- ENDPOINT /command ---
app.post('/command', (req, res) => {
  // Riceve comandi da SmartThings
  const { command, value } = req.body;

  if (command === 'switch') {
    fancoilState.power = value;
  } else if (command === 'setpoint') {
    fancoilState.setpoint = value;
  }

  console.log('Comando ricevuto:', req.body);
  res.json({ status: 'ok', fancoilState });
});

// --- SERVER ATTIVO ---
app.get('/', (req, res) => {
  res.send('Server SmartThings Fancoil INNOVA attivo!');
});

app.listen(PORT, () => {
  console.log(`Server SmartThings Fancoil INNOVA attivo su porta ${PORT}`);
});
