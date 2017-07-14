var http = require("http");
var https = require("https");
var dateFormat = require('dateformat');

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getNextMeetup = function(onResult)
{

    var options = {
        host: 'api.wordpress.org',
        port: 443,
        path: '/events/1.0/?location=germany',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };


    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        //console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};
exports.getNextMeetupIn = function( city, onResult)
{

    city = encodeURIComponent(city);

    var options = {
        host: 'api.wordpress.org',
        port: 443,
        path: '/events/1.0/?location=' + city,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };


    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        //console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};

exports.generateSpeach = function( result )
{
  var speachResponse;
  var textResponse;

  console.log(result.events.length);
  if( result.events.length > 0 ){
    var event = result.events[0];
    speachResponse = 'Das nächste Treffen findet am ' + dateFormat(event.date, "d.m.yyyy") + " in " + event.location.location + " statt. Der Titel des Meetups lautet " + event.title
    textResponse = 'Das nächste Treffen findet am ' + dateFormat(event.date, "d.m.yyyy") + " in " + event.location.location + " statt. Der Titel des Meetups lautet " + event.title + '<br>'
      + 'Mehr Infos unter <br> ' + event.meetup_url;

  }else{
    console.log();
    console.log(result);
    speachResponse = 'Es stehen keine WordPress Meetups in ' + result.location.description + ' und Umgebung an.'
    textResponse = 'Es stehen keine WordPress Meetups in ' + result.location.description + ' und Umgebung an.'
  }

  return {
    "speachResponse": speachResponse,
    "textResponse": textResponse
  };

};
