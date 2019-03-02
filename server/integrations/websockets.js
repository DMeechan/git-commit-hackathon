/**
* REALTIME WEB SOCKETS CONNECTION WIHT SOCKET.IO
*/

const speechToText = require('./speech-to-text-from-stream');

module.exports = function startWebsocketServer(server) {
    const io = require('socket.io')(server)
    let recognizeStream = null;

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

        client.on('binaryData', function (data) {
            console.log('binary boiisss')
            recognizeStream = speechToText.write(recognizeStream, data);
        });
    });
}