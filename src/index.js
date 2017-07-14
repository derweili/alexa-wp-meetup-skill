var Alexa = require('alexa-sdk');
var meetupService = require('./meetup-service.js');
var APP_ID = "amzn1.ask.skill.5b311205-7baa-4425-9843-99d324630e45";

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    //alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

    'NewSession': function () {
        this.emit('nextmeetup'); // Uses the handler in newSessionHandlers
    },
    'Unhandled': function () {
        this.emit('nextmeetup'); // Uses the handler in newSessionHandlers
    },

    'AMAZON.CancelIntent': function () {
      var message = 'Auf wiederhören.';
      this.emit(':ask', message, message);
    },

    'AMAZON.HelpIntent': function() {
        var message = 'Hallo, frage mich nach dem nächsten WordPress Meetup, in einer beliebigen Stadt in Europa.';
        this.emit(':ask', message, message);
    },

    'nextmeetup': function () {
        //var location = this.event.request.intent.slots.location.value;
        //console.log(location);
        const self = this;
        meetupService.getNextMeetup(function( statusCode, obj ){
          var response = meetupService.generateSpeach( obj );

          self.emit( ':tell', response.speachResponse, response.textResponse );

        });
    },
    'nextmeetupatlocation': function () {
        const self = this;
        var location = this.event.request.intent.slots.location.value;

        console.log(location);
        meetupService.getNextMeetupIn( location, function( statusCode, obj ){
          var response = meetupService.generateSpeach( obj );

          self.emit( ':tell', response.speachResponse, response.textResponse );

        });
    }

};
