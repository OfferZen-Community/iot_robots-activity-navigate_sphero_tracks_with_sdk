"use strict";
 
var sphero = require('sphero')
/*var robots = {
    'Sonic': 'F8:CC:A1:A7:51:86',
    'Shadow': 'FF:AF:08:F6:7D:19',
    'Silver': 'EB:76:90:85:BE:AD'
}
 */
 var robotName = 'Sphero-B'
 var robotId = 'FF:AF:08:F6:7D:19'
 var orb = sphero(robotId)
 
var awsIot = require('aws-iot-device-sdk')
 
 
var device = awsIot.device({
  keyPath: '/home/pi/Documents/sphero-b/7e3a5e944b-private.pem.key',
  certPath: '/home/pi/Documents/sphero-b/7e3a5e944b-certificate.pem.crt',
  caPath: '/home/pi/Documents/sphero-b/ca.pem',
  clientId: 'Sphero-B',
  host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
})
 
device.on('connect', function() {
  console.log('Connected to AWS IoT');
  device.subscribe('some-topic');
});
 
 orb.connect(function () {
  console.log('connected to sphero')
  orb.streamVelocity();
 
  //orb.resetAim(0)
});




device.on('message', function(topic, payload) {
  var message = JSON.parse(payload.toString())

  console.log(message['message'])
var color = message['Color'];
var dir = message['Direction'];
var dist = message['Distance'];
   var counter = 0;
  var upper = 0;
   if (dist != undefined) {
    upper = dist.length;
   }
 
 orb.on("velocity", function(data){
   if(counter < upper){
      console.log(data.xVelocity.value[0] + " " + data.yVelocity.value[0]);
  if(Math.abs(data.xVelocity.value[0]) < 20 && Math.abs(data.yVelocity.value[0]) < 20){

    if(color!= null){
  
        orb.color(color[counter])
        console.log("Color changed to " + color[counter])
        device.publish('some-topic', JSON.stringify({
        "Output" : "Color changed to " + color[counter]
  }));
}


if(dir!=null && dist!=null){
  orb.roll(dist[counter],dir[counter])
 
  console.log("Sphero moved " + dir[counter])
  console.log("Sphero moved " + dist[counter] + "units")
  device.publish('some-topic', JSON.stringify({
    "Distance Output" : "Sphero moved " +dir[counter] + "degrees",
    "Speed Output": "Sphero moved " + dist[counter] + "units"
  }));


      counter++;

    }
  }

}


});



});
 
 