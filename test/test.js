'use strict';

// API Keys can be generated at https://platform.touchsms.com.au/apis/
var access_token = "RGyrznuKkTYa";
var token_id = "LvuOpLNs0FPCYfW8XEzspq3UL";

var nock = require('nock');
var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var touchSMS = require('../index');
var sms = new touchSMS(access_token, token_id, true);
var smsBad = new touchSMS(access_token + '-', token_id + '-', true);

it('should send SMS', function() {
    nock('http://sandbox.touchsms.com.au')
      .post('/rest/v1/messages')
      .reply(200, {
        code: 200,
        errors: 0,
        message: '',
      });

    var touchSmsOptions = {
        number: 61491570156,
        message: 'hello world',
        senderid: 'touchSMS'
    };

    var result = sms.sendSms(touchSmsOptions);

    return result.then(function(data) {
        var json = JSON.parse(data);

        expect(json.errors).to.exist;
        expect(json.errors).to.equal(0);
        expect(json.message).to.equal('');
        expect(json.code).to.equal(200);
    }, function(err) {
        assert.fail(err);
    });
});

it('should fail to send SMS (authentication error)', function() {
    nock('http://sandbox.touchsms.com.au')
      .post('/rest/v1/messages')
      .reply(403, {
        code: 403,
        errors: {
          auth: 'Authentication failed.',
        },
        message: '',
      });

    var touchSmsOptions = {
        number: 61491570156,
        message: 'hello world',
        senderid: 'touchSMS'
    };

    var result = smsBad.sendSms(touchSmsOptions);

    return result.then(function(data) {
        var json = JSON.parse(data);

        expect(json.errors).to.exist;
        expect(json.errors.auth).to.exist;
        expect(json.errors.auth).to.equal('Authentication failed.');
        expect(json.code).to.equal(403);
    }, function(err) {
        assert.fail(err);
    });
});

it('should fail to send SMS (invalid sender ID error)', function() {
    nock('http://sandbox.touchsms.com.au')
      .post('/rest/v1/messages')
      .reply(400, {
        code: 400,
        errors: {
          children: {
            senderid: {
              errors: [
                'Invalid Sender ID. Must be less than 11 Alphanumeric characters or 16 numeric characters. No spaces or symbols allowed.'
              ]
            }
          }
        },
        message: 'Validation Failed',
      });

    var touchSmsOptions = {
        number: 61491570156,
        message: 'hello world',
        senderid: 'bad sender id hello + world'
    };

    var result = sms.sendSms(touchSmsOptions);

    return result.then(function(data) {
        var json = JSON.parse(data);

        expect(json.message).to.exist;
        expect(json.message).to.equal('Validation Failed');
        expect(json.errors.children.senderid.errors[0]).to.exist;
        expect(json.errors.children.senderid.errors[0]).to.equal('Invalid Sender ID. Must be less than 11 Alphanumeric characters or 16 numeric characters. No spaces or symbols allowed.');
        expect(json.code).to.equal(400);
    }, function(err) {
        assert.fail(err);
    });
});


it('should fail to send SMS (missing fields error)', function() {
    nock('http://sandbox.touchsms.com.au')
      .post('/rest/v1/messages')
      .reply(400, {
        code: 400,
        errors: {
          children: {
            number: {
              errors: [
                'Number field not supplied'
              ]
            }
          }
        },
        message: 'Validation Failed',
      });

    var touchSmsOptions = {
        message: 'hello world',
        senderid: 'touchSMS'
    };

    var result = sms.sendSms(touchSmsOptions);

    return result.then(function(data) {
        var json = JSON.parse(data);

        expect(json.message).to.exist;
        expect(json.message).to.equal('Validation Failed');
        expect(json.errors.children.number.errors[0]).to.exist;
        expect(json.errors.children.number.errors[0]).to.equal('Number field not supplied');
        expect(json.code).to.equal(400);
    }, function(err) {
        assert.fail(err);
    });
});

it('should get User balance', function() {
    nock('http://sandbox.touchsms.com.au')
      .get('/rest/v1/users')
      .reply(200, {
        code: 200,
        credits: 100,
        username: 'user@mock',
      });

    var result = sms.users();

    return result.then(function(data) {
        var json = JSON.parse(data);

        expect(json.username).to.exist;
        expect(json.credits).to.match(/^-?([0-9]+).?([0-9]{0,2})?$/);
        expect(json.code).to.equal(200);
    }, function(err) {
        assert.fail(err);
    });
});

it('should fail to get User balance', function() {
    nock('http://sandbox.touchsms.com.au')
      .get('/rest/v1/users')
      .reply(403, {
        code: 403,
        errors: {
          auth: 'Authentication failed.'
        }
      });

    var result = smsBad.users();

    return result.then(function(data) {
        var json = JSON.parse(data);

        expect(json.errors).to.exist;
        expect(json.errors.auth).to.exist;
        expect(json.errors.auth).to.equal('Authentication failed.');
        expect(json.code).to.equal(403);
    }, function(err) {
        assert.fail(err);
    });
});
