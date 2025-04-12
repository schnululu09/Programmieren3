// Socket.io: Verbindung zum Server herstellen


// Die socket Variable enthält eine Verbindung zum Server.
const socket = io();
const cellSize = 20;

let statistikText;

// setup Funktion von p5.js
function setup() {
    createCanvas(windowWidth, windowHeight);
    statistikText = document.getElementById("statistik")
}

// Mit socket.on() können wir auf Ereignisse vom Server reagieren.
// Hier reagieren wir auf das Ereignis matrix, das uns die aktuelle Matrix vom Server sendet.
socket.on('matrix', (matrix) => {
    // Die Matrix wird auf den Bildschirm gezeichnet.
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            fill(matrix[i][j]);
            rect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
});

socket.on('statistik', (statistik) => {
    statistikText.innerHTML = statistik
});

window.addEventListener("keydown", (event) => {
    if (event.key === "b" || event.key === "B") {
        socket.emit("event", "Bombe");
    }
    if (event.key === "e" || event.key === "E") {
        socket.emit("event", "SpawnGrassEater");
    }
    if (event.key === "m" || event.key === "M") {
        socket.emit("event", "SpawnMeatEater")
    }
    if (event.key === "g" || event.key === "G") {
        socket.emit("event", "SpawnGrass")
    }
});



// wir können hier auch auf andere Ereignisse reagieren, die der Server sendet
// socket.on('someEvent', (data) => {