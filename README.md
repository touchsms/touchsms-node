touchSMS 
=========

A helper library to send SMS with [touchSMS](https://touchsms.com.au)

## Installation

    npm install touchsms

## Usage
    var touchSMS = require('touchsms');

    // access token & token id can be generated at https://platform.touchsms.com.au/apis/

    var sms = new touchSMS('access_token', 'token_id'); 

    var smsOptions = {
        number: 61491570156,
        message: 'hello world',
        senderid: 'touchSMS'
    }

    sms.sendSms(smsOptions);

Output

    {"code":200,"errors":0,"message":""}


## Tests
  Tests run through a Sandbox URL with Sandbox credentials. 

  You can update the tests with your own credentials and remove the final `true` parameter on the touchSMS constructor.

    npm test