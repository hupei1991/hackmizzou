var tessel = require('tessel');
 
tessel.listDevices(function(err,devices) {
	if(!devices || devices.length == 0) {
		console.error("Couldn't find any Tessels");
	} else {
		tessel.findTessel({ serial: devices[0].serial }, function(err, client) {
				if(!err) {
					console.log('found Tessel');
					client.send("Hello from Mac");
					client.on('log', function(level,msg) {
						console.log("Tessel:" + msg);
					});
				} else {
					console.error("Could not find Tessel");
				}
			}
		);
	}
});