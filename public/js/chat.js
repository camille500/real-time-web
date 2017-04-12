(function() {
  var socket = io();

  console.log(socket.id)

  var form = document.getElementById('chatForm');
  var input = document.getElementById('message');
  var chatList = document.getElementById('chatMessages');
  var username = document.getElementById('usName').innerHTML;

  form.onsubmit = function(e) {
    e.preventDefault();
    socket.emit('chat message', input.value, username);
    input.value = "";
    return false;
  };

  socket.on('chat message', function(message, user) {
    if (user != username) {
      playSound();
    }
    var userSpan = document.createElement('span');
    var chatItem = document.createElement("li");
    userSpan.appendChild(document.createTextNode('[' + username + '] '));
    chatItem.appendChild(userSpan);
    chatItem.appendChild(document.createTextNode(message));
    chatList.appendChild(chatItem);
  });

  function playSound() {
    var player = document.getElementById("sound");
    sound.play();
  }

}());
