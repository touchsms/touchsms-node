touchSMS 
=========

A helper library to send SMS with [touchSMS](https://touchsms.com.au)

## Installation

  `npm install touchsms`

## Usage
    var touchSMS = require('touchsms');

    // access token & token id can be generated at https://platform.touchsms.com.au/apis/

    var sms = new touchSMS('access_token', 'token_id'); 

    var smsOptions = {
        number: 61491570156,
        message: 'hello world',
        senderid: 'touchSMS'
    }

  Output should be `{"code":200,"errors":0,"message":""}`


## Tests
  Update `/test/test.js` with live API credentials.

  `npm test`
