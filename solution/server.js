const mqtt_url = 'mqtt://test.mosquitto.org'
const port = 7076;

const mqtt = require('mqtt')  
const client = mqtt.connect(mqtt_url)

const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

app.get('/', function(req, res,next) {  
    res.sendfile(__dirname +'/public'+ '/index.html');
});

server.listen(port);  

console.log('Server listen on port : '+port);

let ledStatus = 'OFF';


/**
 * Code for Socket.io
 */
function sendLedStatus(message){
    io.emit('io/iot/led', message)
}
io.on('connection', (c) => {
    c.on('io/iot/led/switch', () => {
        console.log('Revieved io/iot/led/switch')
        ledStatus = ledStatus === 'OFF' ? 'ON' : 'OFF';
        client.publish('iot/led', ledStatus)
    })
    c.emit('io/iot/led', ledStatus)
})



/**
 * Code for MQTT connection
 */
client.on('connect', function () {
    console.log('Connexion au serveur mqtt : ' + mqtt_url)
    client.subscribe('iot/led');
})

client.on('message', (topic, message) => { 
    message = message.toString();
    switch (topic) {
        case 'iot/led':
            console.log(topic +' : '+ message)
            ledStatus = message;
            sendLedStatus(message);
            break;
        default :
            console.log(topic +' : '+ message)
            break;
    }
})
