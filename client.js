"use strict";
/* eslint no-use-before-define: 0 */
/* eslint no-process-exit: 0 */

var sphero = require('sphero')
var orb = sphero('E6:EA:05:40:23:68')
var speed = 0;


orb.connect(function() {
 

orb.streamVelocity();

orb.on("velocity", function(data) {
  console.log("data:");
  console.log("  xVelocity:", data.xVelocity.value[0]);
  console.log("  yVelocity:", data.yVelocity.value[0]);
  console.log("  max:", Math.max(data.xVelocity.value[0],data.yVelocity.value[0]));

speed = Math.max(data.xVelocity.value[0],data.yVelocity.value[0]);

device.publish('things/awesome/commands/speed' , JSON.stringify({
    "speed":speed
	
    }));
});


});



var awsIot = require('aws-iot-device-sdk') 




var device = awsIot.device({
  keyPath: 'ca75f5aadd-private.pem.key',
  certPath: 'ca75f5aadd-certificate.pem.crt',
  caPath: 'VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem',
  clientId: 'raspberry_pi-awesome',
  host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
});

device.on('connect', function() {
  console.log('Connected to AWS IoT');
  device.subscribe('things/awesome/commands/roll');
  device.subscribe('things/awesome/commands/stop');

  
});

device.on('message', function(topic, payload) {
  var message = JSON.parse(payload.toString())
  

  if (topic == 'things/awesome/commands/roll') {
	console.log('roll message received');
 	
	orb.roll(message.speed,message.direction);
	



    }


if (topic == 'things/awesome/commands/stop') {
	console.log('stop message received');
	orb.roll(0,0);

	
    }




});