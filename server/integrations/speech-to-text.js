const fs = require('fs');
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

const fileName = '../files/audio.mp3';

const file = fs.readFileSync(fileName);
const audioBytes = file.toString(base64);

const audio = {
    content: audioBytes,
};

const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
};

const request = {
    audio, config
};
