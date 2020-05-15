'use strict';

var http = require('http');
var querystring = require('querystring');
var q = require('q');

var touchSMS = function(access_token, token_id, sandbox) {

    if (sandbox === true) {
        var url = 'sandbox.touchsms.com.au';  
    } else {
        var url = 'platform.touchsms.com.au';    
    }    

    this.sendSms = function(options, callback) {
        var postBuild = [];

        if (options.number != undefined) {
            postBuild['number'] = options.number;
        }

        if (options.message != undefined) {
            postBuild['message'] = options.message;
        }

        if (options.senderid != undefined) {
            postBuild['senderid'] = options.senderid;
        }

        if (options.reference != undefined) {
            postBuild['reference'] = options.reference;
        }

        if (options.campaignName != undefined) {
            postBuild['campaignName'] = options.campaignName;
        }

        var postData = querystring.stringify(postBuild);

        var options = {
            auth: access_token + ':' + token_id,
            host: url,
            path: '/rest/v1/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        var deferred = q.defer();

        var req = http.request(options, (res) => {
            var body = '';

            res.setEncoding('utf8');
            res.on('data', (data) => {
                body += data;
            });
            res.on('end', () => {
                deferred.resolve(body);
            });
        });

        req.on('error', (err) => {
            deferred.reject(err);
        });

        req.write(postData);
        req.end();

        return deferred.promise;
    }

    this.users = function(callback) {
        var options = {
            auth: access_token + ':' + token_id,
            host: url,
            path: '/rest/v1/users',
            method: 'GET'
        };

        var deferred = q.defer();

        var req = http.request(options, (res) => {
            var body = '';

            res.setEncoding('utf8');
            res.on('data', (data) => {
                body += data;
            });
            res.on('end', () => {
                deferred.resolve(body);
            });
        });

        req.on('error', (err) => {
            console.log(err);
            deferred.reject(err);
        });

        req.end();

        return deferred.promise;
    } 
}

module.exports = touchSMS;
