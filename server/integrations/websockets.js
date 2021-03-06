/**
* REALTIME WEB SOCKETS CONNECTION WIHT SOCKET.IO
*/

const speechToText = require('./speech/fromStream');
const textAnalysis = require('./textAnalysis');

module.exports = function startWebsocketServer(server) {
    const io = require('socket.io')(server)

    io.on('connection', function (client) {
        console.log('=> Client connected to server');
        let recognizeStream = null;

        client.emit('join', 'hello from server bois');

        client.on('join', data => {
            client.emit('messages', 'Established websocket connection with server :D')
        });

        client.on('messages', data => {
            client.emit('broad', data);
        });

        client.on('startAudioStream', function (data) {
            console.log('starting audio stream: ', data);
            recognizeStream = speechToText.getRecognitionStream(this, data);
        });

        client.on('endAudioStream', function (data) {
            console.log('ending audio stream: ', data);
            recognizeStream = speechToText.endRecognitionStream(recognizeStream);
        });

        client.on('binaryData', function (bufferData) {
            // console.log('Uploading binary data of size:', bufferData.length);
            speechToText.write(recognizeStream, bufferData);
        });

        client.on('getRating', async (text) => {
            const rating = await textAnalysis.requestRating(text);
            client.emit('rating', rating)
        })

        client.on('getEmotions', async (text) => {
            const emotions = await textAnalysis.requestEmotions(text);
            client.emit('emotions', emotions)
        })
    });
}
