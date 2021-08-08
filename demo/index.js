const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;
const Protocol = require('azure-iot-device-mqtt').Mqtt;
const connectionString = process.env.DEVICE_CONNECTION_STRING;
var data = require('./demo.json');
var sendingMessage = false;


module.exports = async function (context, req) {

    var start = req.query.start;
    var messageId = 0;




    if (start == "true") {
        onStart();
    } else {
        onStop();
    }

    function sendMessage() {
        if (!sendingMessage) { return; }
        
        
        // for( var i =0; i < 150; i++){
        var content = JSON.stringify(data[messageId]);
        // console.log(data[messageId]);

        messageId++;
        // var content = JSON.stringify({
        //     messageId: messageId,
        //     deviceId: 'Clyde4',
        //     teamId: 'USEV',
        //     raceId: 1,
        //     accelerometer:
        //     {
        //         X: 1.00,
        //         Y: 2.00,
        //         Z: 3.00
        //     },
        //     gyroscope:
        //     {
        //         X: 4.00,
        //         Y: 5.00,
        //         Z: 6.00
        //     },
        //     location:
        //     {
        //         lat: 55.861340,
        //         long: -4.243425
        //     },
        //     throttle: 0,
        //     battery: 98,
        //     speed: 11
        // });
        var message = new Message(content);
        console.log('Sending message: ' + content);
        client.sendEvent(message, function (err) {
            if (err) {
                console.error('Failed to send message to Azure IoT Hub');
            } else {
                console.log('Message sent to Azure IoT Hub');
            }
        });
    // }
    }

    function onStart() {
        sendingMessage = true;

        console.log("Starting...");
    }

    function onStop() {
        sendingMessage = false;
        console.log("Stoping...");
    }

    function receiveMessageCallback(msg) {
        var message = msg.getData().toString('utf-8');
        client.complete(msg, function () {
            console.log('Receive message: ' + message);
        });
    }


    // create a client
    client = Client.fromConnectionString(connectionString, Protocol);

    client.open(function (err) {
        if (err) {
            console.error('[IoT hub Client] Connect error: ' + err.message);
            return;
        }

        // set C2D and device method callback
        client.onDeviceMethod('start', onStart);
        client.onDeviceMethod('stop', onStop);
        client.on('message', receiveMessageCallback);
        setInterval(sendMessage, 1000);
    });
}