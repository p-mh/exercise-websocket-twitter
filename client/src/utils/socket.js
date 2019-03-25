import socketIOClient from 'socket.io-client';
import { TWEET, SEARCH_WORD } from './constantes';

const socket = socketIOClient('http://localhost:8080');

export const getTweet = callback => {
  socket.on(TWEET, tweet => {
    callback(tweet);
  });
};

export const sendSearchWord = searchWord => {
  socket.emit(SEARCH_WORD, searchWord);
};
