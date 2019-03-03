async function main() {
    const fs = require('fs');
    const speech = require('@google-cloud/speech');

    const client = new speech.SpeechClient();

    const fileName = 'files/lecture.wav';

    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');

    const audio = {
        content: audioBytes,
    };

    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 24000,
        languageCode: 'en-US',
    };

    const request = {
        audio, config
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
}

main().catch(console.error);

module.exports = main;