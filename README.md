# Real time web

This is the Real time Twitter application I've made for the Real time web course during the minor Web Development. The application uses socket.io and is a server-side node application.

## Live URL

The live version can be found at https://real-time-web-cmd.herokuapp.com/

## Installation

First you have to clone the repository. Open your terminal and go to the folder you want to clone the repo in. Then type ```$ git clone https://github.com/camille500/real-time-web.git``` to clone the repo to the folder.

In the same folder, type ``$ npm install`` to install all dependencies. The application can now be started with the ```$ npm start``` command.

## Short description

I've build a application that shows the last Tweets with 'Amsterdam' in it. User can create an account that will be stored in a MongoDB collection. After logging in, the user can go to the 'Twitter Dashboard'. On the dashboard is a stream that shows all new Tweets since the page was opened. There is also a counter that counts the amount of new Tweets. 

### Features

- Registering a account and logging in
- Protected pages, only for user that logged in
- Express-session for storing session data
- Websocket for the Twitter functionality
- Live API data from the Public Twitter stream
- Average amount of tweets per minute

### Wishlist

* oAuth to login, so that the user can get more data from it's own profile
* The possibility to choose an own keyword to stream on
* D3 Data visualisations
* Showing more data that comes with the tweets
* Showing a push notification if a desired tweet comes up
* More interesting data for the dashboard
* Better overall design and UX
