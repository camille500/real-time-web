(function() {
  var socket = io();
  var form = document.getElementById('chatForm');
  var input = document.getElementById('message');

  form.onsubmit = function() {
    socket.emit('chat message', input.value);
    input.value = "";
    return false;
  };

  socket.on('chat message', function(message) {
    console.log(message);
  });

}());
