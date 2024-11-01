const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resultParagraph = document.getElementById('result');
const record = document.getElementById('record')
let recognition;
let listeningDuration = 6000; // time in milliseconds (3 seconds)

// Check for browser support
if ('webkitSpeechRecognition' in window) {
    // Initialize Speech Recognition
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        resultParagraph.innerText = transcript;
    };

    recognition.onend = () => {
        startButton.disabled = false;
        stopButton.disabled = true;
    };

    startButton.addEventListener('click', () => {
        startButton.disabled = true;
        stopButton.disabled = false;
        recognition.start();
        record.classList.add('anime')
        // Automatically stop recording after 3 seconds
        setTimeout(function() {
            record.classList.remove("anime");
        }, 6000);
        setTimeout(() => {
            recognition.stop();
        }, listeningDuration);

    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
        record.classList.remove("anime");
    });
} else {
    alert("Speech Recognition is not supported in this browser.");
}
