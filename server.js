const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Variabili d'ambiente
const API_URL = 'https://innovaenergie.cloud/api/v/1';
const USER_EMAIL = process.env.INNOVA_EMAIL;
const USER_PASSWORD = process.env.INNOVA_PASSWORD;
const DEVICE_SERIAL = process.env.INNOVA_SERIAL;

// Token di sessione Innova
let accessToken = null;

// Funzione per autenticarsi
async function login() {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: USER_EMAIL,
            password: USER_PASSWORD
        });
        accessToken = response.data.access_token;
        console.log('Login Innova riuscito!');
    } catch (err) {
        console.error('Errore login Innova:', err.message);
    }
}

// Endpoint di stato
app.get('/status', async (req, res) => {
    try {
        if (!accessToken) await login();

        const response = await axios.get(`${API_URL}/devices/${DEVICE_SERIAL}/status`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per inviare comandi
app.post('/command', async (req, res) => {
    try {
        if (!accessToken) await login();

        const { command, value } = req.body;

        const response = await axios.post(
            `${API_URL}/devices/${DEVICE_SERIAL}/command`,
            { command, value },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Server SmartThings Fancoil INNOVA attivo!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo su porta ${PORT}`));
