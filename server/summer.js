// Load the twilio module
var accountSid = 'ACbc87c4252527f77bd791d8e7dce5b061';
var authToken = "265644e54147746eab09706c44e44814";
var client = require('twilio')(accountSid, authToken); 
 
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
client.calls.create({
    url: "http://bluefly.cloudapp.net/summer.xml",
    to:"+15738258582",
    from:"+14422426666"
}, function(err, call) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    process.stdout.write(call.sid);
});
