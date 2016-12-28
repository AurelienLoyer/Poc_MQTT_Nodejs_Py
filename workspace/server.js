const port = 7076;
const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  

app.get('/', function(req, res,next) {  
    res.sendfile(__dirname +'/public'+ '/index.html');
});

server.listen(port);  

console.log('Server listen on port : '+port);


/**
 * Code for Socket.io
 */
//TODO



/**
 * Code for MQTT connection
 */
/*client.on('connect', function () {
    //TODO
})

client.on('message', (topic, message) => { 
    message = message.toString();
    switch (topic) {
        //TODO
        default :
            console.log(topic +' : '+ message)
            break;
    }
})*/
