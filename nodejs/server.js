const mqtt_url = 'mqtt://test.mosquitto.org'
const mqtt = require('mqtt')  
const client = mqtt.connect(mqtt_url)

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
    //A la reception d'un message on switch sur le topic 
    switch (topic) {
        case 'presence':
            console.log(topic +' : '+ message)
            break;
        case 'test':
            console.log(topic +' : '+ message)
            break;
        default :
            console.log(topic +' : '+ message)
            break;
    }

})