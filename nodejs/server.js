const mqtt_url = 'mqtt://test.mosquitto.org'
const port = 7076;

const mqtt = require('mqtt')  
const client = mqtt.connect(mqtt_url)

var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

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
 * Code For MQTT
 */
client.on('connect', function () {
    console.log('Connexion au serveur mqtt : ' + mqtt_url)
    client.subscribe('iot/led')
    client.subscribe('temp/random')
})

client.on('message', (topic, message) => { 
    message = message.toString();
    switch (topic) {
        case 'iot/led':
            console.log(topic +' : '+ message)
            ledStatus = message;
            sendLedStatus(message);
            break;
        case 'temp/random':
            console.log(topic +' : '+ message)            
            break;
        default :
            console.log(topic +' : '+ message)
            break;
    }
})
