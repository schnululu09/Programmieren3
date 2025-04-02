// 1. Benötigte Module laden
const express = require('express');
const http = require('http');
const { Server } = require("socket.io"); // Wichtig für socket.io v3+

// 2. Server aufsetzen
const app = express();
const server = http.createServer(app);
const io = new Server(server); // Socket.IO an den HTTP-Server binden

const PORT = 3005;

// 3. "public" Ordner bereitstellen
// Express soll alle Dateien aus dem 'public' Ordner direkt an den Browser senden können
// Wenn der Browser "/" anfragt, wird automatisch public/index.html gesendet!
app.use(express.static('public'));

// --- HIER KOMMEN SPÄTER DIE SOCKET.IO SACHEN HIN ---
// 4. Lauschen auf neue Verbindungen
io.on('connection', (socket) => {
    // 'socket' repräsentiert die Verbindung zu EINEM Client
    console.log('Ein Benutzer hat sich verbunden:', socket.id);

    // 5. Was passiert, wenn der Benutzer die Verbindung trennt?
    socket.on('disconnect', () => {
        console.log('Benutzer hat die Verbindung getrennt:', socket.id);
    });

    // Hier werden wir später auf Nachrichten vom Client lauschen ('message')
    // und Antworten senden ('response')

});
// --- BIS HIER ---

// 6. Server starten
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf <http://localhost>:${PORT}`);
});
