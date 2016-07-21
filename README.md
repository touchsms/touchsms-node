touchSMS 
=========

[![Build Status](https://travis-ci.org/touchsms/touchsms-node.svg?branch=master)](https://travis-ci.org/touchsms/touchsms-node)
[![Coverage Status](https://coveralls.io/repos/github/touchsms/touchsms-node/badge.svg?branch=master)](https://coveralls.io/github/touchsms/touchsms-node?branch=master)


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