(function() {

  const socket = io();

  const config = {
    currentUser: document.getElementById('dashUsername').innerHTML,
    elements: {

    }
  }

  const game = {
    init: function() {
      this.registerUser();
    },
    registerUser: function() {
      socket.emit('add user');
    },
    checkForConnection: function() {

    },
  }

  socket.on('all users', function(data) {
    console.log(data)
  });

  game.init();

}());
