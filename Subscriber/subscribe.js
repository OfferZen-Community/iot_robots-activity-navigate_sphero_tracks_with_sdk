const awsIot = require('aws-iot-device-sdk');
//const moment = require('moment'); // for DateTime formatting
const username = 'spinnoy1' // TODO: replace this
var sphero = require('sphero')
var orb = sphero('E8:CC:F3:D0:70:C4')
var speed = 0;

const device = awsIot.device({
   keyPath: 'e1f20b8b91-private.pem.key',
  certPath: 'e1f20b8b91-certificate.pem.crt',
  caPath: 'VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem',
  clientId: `${username}-newnew`,
  host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
});

orb.connect();

device.on('connect', () => {
  console.log('Subscriber client connected to AWS IoT cloud.\n');

  device.subscribe('things/awesome/commands/speed');
});

device.on('message', (topic, payload) => {

  let message = JSON.parse(payload.toString());

  switch (topic) {
 
	 case 'things/awesome/commands/speed':
	  
speed = message.speed;

if (speed > 10 || speed <-10)
   {
	orb.color('green')
   }
else
  { 
	orb.color('red')
  }

console.log(`New answer token received: "${message.speed}"`)
      break;

    default:
      console.log('Message received on topic "${topic}"\n')
  }
});

