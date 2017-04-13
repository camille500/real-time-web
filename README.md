# Real time web

This is the Real time chat application I've made for the Real time web course during the minor Web Development. The application uses socket.io and is a server-side node application.

## Live URL

The live version can be found at https://real-time-web-cmd.herokuapp.com/

## Installation

First you have to clone the repository. Open your terminal and go to the folder you want to clone the repo in. Then type ```$ git clone https://github.com/camille500/real-time-web.git``` to clone the repo to the folder.

In the same folder, type ``$ npm install`` to install all dependencies. The application can now be started with the ```$ npm start``` command.

## Short description

I've build a chat application that is connected to a MongoDB database. The chat messages are served via a websocket, so that everyone recieves the messages without constantly reloading the page. The messages are then stored in the MongoDB so that you can still see them when revisiting the page (if logged in).

### Features

- Registering a account and logging in.
- Protected pages, only for user that logged in.
- Express-session for storing session data
- Websocket for the chat functionality

### Wishlist

* Shared session data between express and socket.io.
* Show only messages that are stored and not older than 24 hours.
* Groups, so that you can start your own.
* User roles, so that administrators could kick other users. 
