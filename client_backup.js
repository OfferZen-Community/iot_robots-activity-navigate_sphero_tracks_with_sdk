"use strict";
/* eslint no-use-before-define: 0 */
/* eslint no-process-exit: 0 */

var sphero = require('sphero')
var orb = sphero('F8:CC:A1:A7:51:86')
orb.connect();
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
  //var message = JSON.parse(payload.toString())
  

  if (topic == 'things/awesome/commands/roll') {
	console.log('roll message received');
	orb.roll(255,90);


    }


if (topic == 'things/awesome/commands/stop') {
	console.log('stop message received');
	orb.roll(0,0);

	
    }




});