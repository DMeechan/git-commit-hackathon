const fs = require('fs');
const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient();

/**
 * GOOGLE CLOUD SETTINGS
 */

const encoding = 'LINEAR16';
const sampleRateHertz = 32000;
const languageCode = 'en-US'; // BCP-47 language code

const request = {
    config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
        profanityFilter: false,
        enableWordTimeOffsets: false,
        // speechContexts: [{
        //     phrases: ["hoful","shwazil"]
        //    }] // add your own speech context for better recognition
    },
    interimResults: true // realtime translation as the user is speaking
};

/**
 * STARTING AND ENDING SPEECH-TO-TEXT STREAMS
 */

function getRecognitionStream(client, data) {
    return speechClient.streamingRecognize(request)
        .on('error', console.error)
        .on('data', data => {
            const transcription = (data.results[0] && data.results[0].alternatives) ? `Transcription: ${data.results[0].alternatives[0].transcript}` : `Reached transcription time limit, press Ctrl+C`;
            console.log(transcription)
            client.emit('speechData', data);

            // if end of utterance, let's restart stream
            // this is a small hack. After 65 seconds of silence, the stream will still throw an error for speech length limit
            if (data.results[0] && data.results[0].isFinal) {
                endRecognitionStream();
                getRecognitionStream(client, data);
                console.log('LOG: restarted stream serverside');
            }
        })
}

function endRecognitionStream(recognizeStream) {
    if (recognizeStream) {
        recognizeStream.end();
    }
    return null;
}

function write(recognizeStream, data) {
    if (recognizeStream != undefined) {
        recognizeStream.write(data);
    }
}

module.exports = {
    getRecognitionStream, endRecognitionStream, write
}
