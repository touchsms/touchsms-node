var touchSMS = require('../index'); // require('touchsms');

// test mode
var sms = new touchSMS('RGyrznuKkTYa', 'LvuOpLNs0FPCYfW8XEzspq3UL', true);

// live mode
// var sms = new touchSMS('LIVE_API_ACCESS_TOKEN', 'LIVE_API_TOKEN_ID');

var touchSmsOptions = {
    number: 61491570156,
    message: 'hello world',
    senderid: 'touchSMS'
};

var result = sms.sendSms(touchSmsOptions);

result.then(function(data) {
    var json = JSON.parse(data);

    console.log(json);
});

