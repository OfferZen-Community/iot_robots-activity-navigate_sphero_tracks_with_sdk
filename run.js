var sphero = require("sphero");
var spheroId = 'F8:CC:A1:A7:51:86';
var orb = sphero(spheroId);

console.log('trying to connect to sphero...');

const delayTime = 2000;

orb.connect(function () {
  console.log('connected to sphero');
  orb.color("red");
  console.log("::START CALIBRATION::");

  orb.startCalibration();
}).delay(5000).then(function(){
    console.log("::FINISH CALIBRATION::");
    orb.finishCalibration();
    orb.color("green");
})
  //var direction = Math.floor(Math.random() * 360);

  // setInterval(function() {
    
  //   var direction = Math.floor(Math.random() * 360);
  //   console.log('rolling...' + direction);
  //   orb.roll(40, direction);

    
  // }, 2000);
  //exit();
.delay(2000).then(function(){
  orb.color('blue');
  console.log('first run');
  return orb.roll(96,0).delay(delayTime);
}).then(function() {
  return orb.roll(0,0).delay(500);
})
.delay(2000).then(function(){
  orb.color('green');
  console.log('second run');
  return orb.roll(94,315).delay(delayTime);
}).then(function() {
  return orb.roll(0,315).delay(500);
})
.delay(2000).then(function(){
  orb.color('purple');
  console.log('third run');
  return orb.roll(58,45).delay(delayTime);
}).then(function() {
  return orb.roll(0,45).delay(500);
})
.delay(2000).then(function(){
  orb.color('yellow');
  console.log('fourth run');
  return orb.roll(37,90).delay(delayTime);
})
.delay(2000).then(function(){
  orb.color('red');
  console.log('fifth run');
  return orb.setRawMotors({lmode: 0x01, lpower: 255, rmode: 0x02, rpower: 255});
}).delay(2000).then(function(){ 
  orb.color('yellow');
  orb.stop();
  process.exit()
});