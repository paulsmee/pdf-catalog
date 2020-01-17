// This is the base server which also routes functions to the user.

// 'use-strict' will ensure the file will fail if there are any errors,
// it's a quick way to ensure your code is correct (though it still might not do what you expected).
'use strict';

// This loads the 'express' package so we can use the functions within it.
var express = require('express');
var server = express();
var bodyParser = require('body-parser');

server.set('view engine', 'ejs');

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(express.static('public'));
// Connect our router function from router.js (the module we exported at the bottom).
server.use(require('./router'));

// Specify which port to listen on
var port = 8080;
//This is the action our server will take once it is ready to serve.
server.listen(port, function() {
  // This message is displayed on the host machine when the server is started.
  console.log('The server is listening on port ' + port);
});
