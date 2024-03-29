import paho.mqtt.client as mqtt

# We need to call this method when we push the button
def switchLight(state):
    print('switch light')
    # Send message to MQTT clients. Il faut envoyer les chaines de caracteres ON/OFF
    # client.publish("iot/led", "OFF")

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("iot/led")

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("test.mosquitto.org", 1883, 60)

client.loop_forever()
