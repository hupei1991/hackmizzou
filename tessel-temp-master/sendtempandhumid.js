// Taken from Tessel.io wifi and climate examples

var http = require('http');
var tessel = require('tessel');

 var climatelib = require('climate-si7020');
var ambientlib = require('ambient-attx4');

//var climatelib = require('http://babbage.cs.missouri.edu/~hcfxd/tessel-temp-master/node_modules/climate-si7020');
//var ambientlib = require('http://babbage.cs.missouri.edu/~hcfxd/tessel-temp-master/node_modules/ambient-attx4');


var request = require('request');

var climate = climatelib.use(tessel.port['A']);
var ambient = ambientlib.use(tessel.port['B']);

climate.on('ready', function () {
	ambient.on('ready', function () {
		console.log('Connected to si7020');
		/*setImmediate(function loop () {*/
			setInterval( function () {
				climate.readTemperature('f', function (err, temp) {
					if (err) throw err;
					climate.readHumidity(function (err, humid) {
						if (err) throw err;
						ambient.getLightLevel( function(err, ldata) {
							if (err) throw err;
							ambient.getSoundLevel( function(err, sdata) {
								if (err) throw err;
								console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH', 'Light level:', ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
								//data .= JSON.stringify({humidity: humid.toFixed(4), degrees: temp.toFixed(4), lightlevel: ldata.toFixed(8), soundlevel: sdata.toFixed(8)});
								//request.post('http://requestb.in/15gylj71', data); 
								request.post('http://bluefly.cloudapp.net/data', {json: {humidity: humid.toFixed(4), degrees: temp.toFixed(4), lightlevel: ldata.toFixed(8), soundlevel: sdata.toFixed(8) }}); 
								//request.post('http://requestb.in/1bnme981', {json: {humidity: humid.toFixed(4), degrees: temp.toFixed(4), lightlevel: ldata.toFixed(8), soundlevel: sdata.toFixed(8) }}); 							

							});
						});
					});
				});
				/*setTimeout(loop, 300);
		});*/
		}, 1000);
	},1000);
});

climate.on('error', function (err) {
  console.log('error connecting module', err);
});

ambient.on('error', function (err_ambient) {
  console.log(err_ambient)
});









