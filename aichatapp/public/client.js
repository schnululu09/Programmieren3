// Code wird erst ausgeführt, wenn das HTML komplett geladen ist
document.addEventListener('DOMContentLoaded', () => {
    console.log("HTML geladen. Client-Skript startet.");

    // Stellt die Verbindung zum Socket.IO Server her
    // (läuft auf dem gleichen Server, von dem die HTML-Seite kam)
    const socket = io();

    // --- HIER KOMMEN SPÄTER UNSERE CLIENT-SOCKET.IO SACHEN HIN ---

    // 1. Was passiert, wenn die Verbindung erfolgreich ist?
    socket.on('connect', () => {
        console.log("✅ Verbunden mit Server! Meine ID:", socket.id);
        // Wir könnten hier eine Nachricht im Chat anzeigen, dass verbunden wurde
        // displayMessage("Verbunden mit dem Chat!", "system"); // (Funktion kommt später)
    });

    // 2. Was passiert, wenn die Verbindung verloren geht?
    socket.on('disconnect', () => {
        console.log("❌ Verbindung zum Server verloren!");
        // Wir könnten hier eine Nachricht im Chat anzeigen
        // displayMessage("Verbindung verloren.", "system"); // (Funktion kommt später)
    });

    // Hier werden wir später auf Antworten vom Server lauschen ('response')
    // und Nachrichten senden ('message')

    // --- BIS HIER ---

}); // Ende von DOMContentLoaded
