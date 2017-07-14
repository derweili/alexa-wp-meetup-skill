var meetupService = require('./meetup-service.js');
var dateFormat = require('dateformat');
var now = new Date();

meetupService.getNextMeetupIn( 'sinsheim', function( statusCode, obj ){
  console.log(obj.events.length);
  if( obj.events.length > 0 ){
    var event = obj.events[0];
    console.log('Das nächste Event findet am ' + dateFormat(event.date, "fullDate") + " in " + event.location.location + " statt. Der Titel des Meetups lautet " + event.title);
  }else{
    console.log('Es stehen eine WordPress Meetups in Sinsheim und Umgebung an.');
  }
});
