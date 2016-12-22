const mqtt_url = 'mqtt://test.mosquitto.org'
const port = 7076;

const mqtt = require('mqtt')  
const client = mqtt.connect(mqtt_url)
const app = require('express.io')()


app.http().io()

app.get('/', function(req, res) {
    res.sendfile(__dirname +'/public'+ '/index.html')
})

app.listen(port);
console.log('Server listen on port : '+port);

client.on('connect', function () {
    //Connexion ok
    console.log('Connexion au serveur mqtt : '+mqtt_url)
    //On souscrit au topic presence et ...
    client.subscribe('presence')
    client.subscribe('test')
    client.subscribe('temp/random')

    //On envoie un message sur ces topics
    client.publish('presence', 'Hello toi ! :)')
    client.publish('temp/random', '50')
})

client.on('message', (topic, message) => { 
    message = message.toString();
    //A la reception d'un message on switch sur le topic 
    switch (topic) {
        case 'presence':
            console.log(topic +' : '+ message)
            break;
        case 'temp/random':
            console.log(topic +' : '+ message)
            app.io.broadcast('temp/random', message)
            break;
        default :
            console.log(topic +' : '+ message)
            break;
    }
})