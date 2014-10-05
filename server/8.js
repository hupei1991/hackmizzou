// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACbc87c4252527f77bd791d8e7dce5b061';
var authToken = "265644e54147746eab09706c44e44814";
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    body: "Today is suitable for OUTDOOR ACTIVITIES.\nRecommendations: Outdoor Swimming",
    to: "+15738258582",
    from: "+14422426666",
    mediaUrl: "http://bluefly.cloudapp.net/pics/outdoor_swimming.jpg"
}, function(err, message) {
    process.stdout.write(message.sid);
});
