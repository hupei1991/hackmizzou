// Taken from Tessel.io wifi and climate examples

var http = require('http');
var tessel = require('tessel');

var climatelib = require('climate-si7020');
var ambientlib = require('ambient-attx4');

var request = require('request');

var climate = climatelib.use(tessel.port['A']);
var ambient = ambientlib.use(tessel.port['B']);

setImmediate(function loop () {
	climate.on('ready', function () {
	  	console.log('Connected to si7020');
			
			climate.readTemperature('f', function (err, temp) {
					//console.log("Read temp: " + temp.toFixed(4));
					
				climate.readHumidity(function (err, humid) {
				    console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
				    //request.post('http://requestb.in/15gylj71', {json: {humidity: humid.toFixed(4), degrees: temp.toFixed(4) }}); 	 
				});
			});
	});

	ambient.on('ready', function () {
	 // Get points of light and sound data.
	  	setInterval( function () {
		    ambient.getLightLevel( function(err, ldata) {
		      if (err) throw err;
		      	ambient.getSoundLevel( function(err, sdata) {
			        if (err) throw err;
			        console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
			    });
			});
		}); // The readings will happen every .5 seconds unless the trigger is hit
 	}); 
	//request.post('http://requestb.in/15gylj71', {json: {humidity: humid.toFixed(4), degrees: temp.toFixed(4), lightlevel: ldata.toFixed(8), soundlevel: sdata.toFixed(8) }}); 	 
	setTimeout(loop, 300);
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});