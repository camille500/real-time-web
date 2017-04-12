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
    var userSpan = document.createElement('span');
    var chatItem = document.createElement("li");
    var timestamp = new Date().getHours() + ':' + new Date().getMinutes();
    if (user != username) {
      playSound();
    } else {
      chatItem.setAttribute('class', 'your');
    }
    userSpan.appendChild(document.createTextNode('[' + user + '] ' + timestamp));
    chatItem.appendChild(userSpan);
    chatItem.appendChild(document.createTextNode(message));
    chatList.appendChild(chatItem);
  });

  function playSound() {
    var player = document.getElementById("sound");
    sound.play();
  }

}());
