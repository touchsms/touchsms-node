var touchSMS = require('../index'); // require('touchsms');

// test mode
var sms = new touchSMS('RGyrznuKkTYa', 'LvuOpLNs0FPCYfW8XEzspq3UL', true);

// live mode
// var sms = new touchSMS('LIVE_API_ACCESS_TOKEN', 'LIVE_API_TOKEN_ID');

var result = sms.users();

result.then(function(data) {
    var json = JSON.parse(data);

    console.log(json);
});