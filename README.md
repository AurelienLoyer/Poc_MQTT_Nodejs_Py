# Déroulé

Le projet de départ se trouve dans le répertoire workspace. Et la solution dans le répertoire solution. 

1. Ecrire un programme python pour allumer la LED
2. Ecrire un programme python pour allumer la led lorsque nous appuyons sur un bouton poussoir
3. Intégrer MQTT. Lorsqu'on click sur le bouton poussoir cela envoie un message au serveur MQTT sur le channel iot/led. 
   On devra envoyer ON lorsqu'on désier allumer, et OFF lorsqu'on désire éteindre la led
   Ecouter le même channel iot/led pour mettre à jour l'état de la led
4. Nous allons maintenant réaliser une interface web avec un server en NodeJS. Les deux parties discuterons via WebSocket, et la librairie socket.io
    - Regarder la documentation de socket.io pour pouvoir intégrer cette librairie côté serveur dans le projet Web existant
    - Côté client, emettre un message via socket.io sur le channel "io/iot/led/switch"
    - Côté serveur, lors de la reception de ce message, publier un message MQTT sur le channel "iot/led" via le module mqtt. (normalement le script python réagir, ainsi que le LED)
    - Nous allons à présent faire réagir la led affichée dans la page Web. Pour cela, côté serveur, à chaque fois qu'un message MQTT sur le channel iot/led est émis, envoyer le statut de 
    la led (ON ou OFF) sur le channel socket.io iot/led

Bonus
- Faire clignotter la LED
- Intéragir avec une sonde de température