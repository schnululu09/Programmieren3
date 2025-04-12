// import von der setup und draw Funktion und der matrix Variable
import { createAndFillMatrix, getTransformedMatrix } from '../matrix.js';
import { setup, draw, matrix, spielStatistiken } from '../script.js';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import fs from 'fs';
import { spawnGrassEater, zündeBombe, spawnMeatEater, spawnGrass} from '../Lebewesen/Events.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

// wir speichern das Ergebnis von der setInterval Funktion in einer Variable,
// damit wir es später stoppen können
let intertval;


// wir sagen Express, dass die Dateien im Ordner client statisch sind
// das bedeutet, dass sie direkt an der Browser geschickt werden können
// Der Code für den Client muss also im Ordner client liegen
app.use(express.static('../client'));

// wenn ein Benutzer die Seite öffnet, wird er auf die index.html Datei weitergeleitet
app.get('/', (req, res) => {
    res.redirect('/index.html');
});





// wir starten den Server auf dem Port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// wenn ein Benutzer eine Verbindung zum Server herstellt, wird diese Funktion ausgeführt
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

        // wir stoppen das Spiel, wenn der Benutzer die Verbindung trennt
        clearInterval(intertval);
    });

    

    socket.on('event', (eventName) => {
        if (eventName == "Bombe") {
          zündeBombe(); 
          spielStatistiken.Events_gezündet++;
        }
        if (eventName == "SpawnGrassEater") {
            spawnGrassEater();
            spielStatistiken.Events_gezündet++;

        }
        if (eventName == "SpawnMeatEater") {
            spawnMeatEater();
            spielStatistiken.Events_gezündet++;

        }
        if (eventName == "SpawnGrass") {
            spawnGrass();
            spielStatistiken.Gewachsenes_Gras++;

        }
    });

 
    

    setup();
    
    let oldmatrix = JSON.parse(JSON.stringify(matrix))
    
    intertval = setInterval(() => {
        draw();
        socket.emit('matrix', getTransformedMatrix());
        socket.emit("statistik", JSON.stringify(spielStatistiken))
    }, 30);
});


