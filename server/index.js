const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { client } = require('./twitterLogs');

const { TWEET, SEARCH_WORD } = require('./constantes');

const sockets = [];

const broadcast = tweet => sockets.forEach(socket => socket.emit(TWEET, tweet));

const getSentiment = message => {
  const Sentiment = require('sentiment');
  const sentiment = new Sentiment();
  const result = sentiment.analyze(message);
  return Math.floor(result.comparative * 10);
};

let clientStream = null;

const getTweet = searchWord => {
  clientStream && clientStream.destroy();
  clientStream = client.stream('statuses/filter', { track: searchWord });
  clientStream.on('data', event => {
    const text = event.text;
    const tweet = { text, sentiment: getSentiment(text) };
    broadcast(tweet);
  });
  clientStream.on('error', error => {
    throw error;
  });
};

io.on('connection', socket => {
  sockets.push(socket);
  socket.on(SEARCH_WORD, searchWord => {
    getTweet(searchWord);
  });
  socket.on('disconnect', () => {
    clientStream && clientStream.destroy();
  });
});

server.listen(8080, () => console.log('server started'));
