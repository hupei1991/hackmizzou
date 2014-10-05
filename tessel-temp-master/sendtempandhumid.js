// Taken from Tessel.io wifi and climate examples

var http = require('http');
var tessel = require('tessel');
var climatelib = require('climate-si7020');
var request = require('request');

var climate = climatelib.use(tessel.port['A']);

climate.on('ready', function () {
  	console.log('Connected to si7020');
		setImmediate(function loop () {
		climate.readTemperature('f', function (err, temp) {
			console.log("Read temp: " + temp.toFixed(4));
			climate.readHumidity(function (err, humid) {
		    	console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
		    	request.post('http://requestb.in/15gylj71', {json: {humidity: humid.toFixed(4), degrees: temp.toFixed(4) }});

		  	});
		});
	});
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});