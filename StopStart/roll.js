const awsIot = require('aws-iot-device-sdk');
const username = 'bdal' // TODO: replace this

const device = awsIot.device({
   keyPath: 'certificates/ca75f5aadd-private.pem.key',
  certPath: 'certificates/ca75f5aadd-certificate.pem.crt',
    caPath: 'certificates/VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem',
  clientId: `rollid`,
      host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
});

device.on('connect', () => {
  console.log('Publisher client connected to AWS IoT cloud.\n');

    device.publish('things/awesome/commands/roll', JSON.stringify({
    "speed":"50",
	"direction":"270"
    }));
});
