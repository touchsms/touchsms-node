touchSMS 
=========

[![NPM](https://nodei.co/npm/touchsms.png?downloads=true&stars=true)](https://nodei.co/npm/touchsms/)

[![Build Status](https://travis-ci.org/touchsms/touchsms-node.svg?branch=master)](https://travis-ci.org/touchsms/touchsms-node)
[![Coverage Status](https://coveralls.io/repos/github/touchsms/touchsms-node/badge.svg?branch=master)](https://coveralls.io/github/touchsms/touchsms-node?branch=master)

The offical helper library to send SMS with [touchSMS](https://touchsms.com.au)

## Installation

    npm install touchsms

## Usage

    var touchSMS = require('touchsms');

    // access token & token id can be generated at https://platform.touchsms.com.au/apis/

### Send SMS
    var sms = new touchSMS('access_token', 'token_id'); 

    var smsOptions = {
        number: 61491570156,
        message: 'hello world',
        senderid: 'touchSMS'
    }

    var result = sms.sendSms(smsOptions);

    result.then(function(data) {
        var json = JSON.parse(data);

        console.log(json);
    });

#### Output

    { 
      code: 200,
      errors: 0,
      message: ''
    }

### View User Details

    var result = sms.users();

    result.then(function(data) {
        var json = JSON.parse(data);

        console.log(json);
    });

#### Output

    { 
      username: 'john.doe@sandbox',
      credits: 5000,
      senderid: 'sandboxAPI',
      mobile: '61491570156',
      code: 200 
    }

## Examples

Examples can be found in `examples` directory.

    npm examples/sendsms.js
    npm examples/users.js

## Tests
  Tests run through a Sandbox URL with Sandbox credentials. 

  You can update the tests with your own credentials and remove the final `true` parameter on the touchSMS constructor.

    npm test