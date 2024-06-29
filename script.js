let startTime, endTime, pauseTime = 0, isPaused = false, pauseStart;

function startClock() {
    if (!startTime) {
        startTime = new Date();
        document.getElementById('summary').innerHTML = 'Startzeit: ' + startTime.toLocaleTimeString();
    }
}

function pauseClock() {
    if (!isPaused) {
        pauseStart = new Date();
        isPaused = true;
        document.getElementById('summary').innerHTML += '<br>Pause gestartet: ' + pauseStart.toLocaleTimeString();
    } else {
        let pauseEnd = new Date();
        pauseTime += (pauseEnd - pauseStart);
        isPaused = false;
        document.getElementById('summary').innerHTML += '<br>Pause beendet: ' + pauseEnd.toLocaleTimeString();
    }
}

function endClock() {
    if (startTime) {
        endTime = new Date();
        let totalTime = (endTime - startTime - pauseTime) / 1000; // in Sekunden
        let hours = Math.floor(totalTime / 3600);
        let minutes = Math.floor((totalTime % 3600) / 60);
        let seconds = totalTime % 60;

        document.getElementById('summary').innerHTML += `<br>Endzeit: ${endTime.toLocaleTimeString()}`;
        document.getElementById('summary').innerHTML += `<br>Gesamtzeit: ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;

        // Optional: Export als CSV
        let csvContent = `data:text/csv;charset=utf-8,Startzeit,Endzeit,Gesamtzeit\n`;
        csvContent += `${startTime.toLocaleTimeString()},${endTime.toLocaleTimeString()},${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden\n`;
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "stempeluhr_summary.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    }
}
