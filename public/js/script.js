(function() {

  var socket = io();
  var tweetCount = 0;
  var seconds = 0;
  var minutes = 0;
  var allTweets = document.getElementsByClassName('allTweets')[0];
  var tweetCounter = document.getElementsByClassName('tweetCounter')[0];
  var minuteOrMinutes = document.getElementById('minuteOrMinutes');
  var secondOrSeconds = document.getElementById('secondOrSeconds');
  var minuteCount = document.getElementById('minutes');
  var secondCount = document.getElementById('seconds');
  var averageCount = document.getElementById('average');

  if(allTweets) {

    setInterval(function() {
       seconds ++;
       secondCount.innerHTML = seconds;
       if(minutes === 1) {
         minuteOrMinutes.innerHTML = 'minuut';
       } else {
         minuteOrMinutes.innerHTML = 'minuten';
       }
       if(seconds === 1) {
         secondOrSeconds.innerHTML = 'seconde';
       } else {
         secondOrSeconds.innerHTML = 'seconden';
       }
       if(seconds > 59) {
         minutes ++;
         seconds = 0;
         minuteCount.innerHTML = minutes;
         secondCount.innerHTML = seconds;
         averageCount.innerHTML = 'De afgelopen minuut kwamen er gemiddeld ' + tweetCount / minutes + ' tweets binnen';
       }
     }, 1000);

    socket.on('new tweet', function(data) {
      tweetCount ++;
      var newTweet = document.createElement('li');
      var tweetText = document.createTextNode(data.text)
      newTweet.appendChild(tweetText);
      allTweets.insertBefore(newTweet, allTweets.childNodes[0])
      tweetCounter.innerHTML = tweetCount;
    });

  }

}());
