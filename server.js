let express = require("express");
let app = express();
let dbConnect = require("./dbConnect");
// routes
let projectsRoute = require('./routes/projects');
let timeSeriesDataRoute = require('./routes/time-series-data');

let http = require('http').createServer(app);
let io = require('socket.io')(http);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));


app.use('/api/projects', projectsRoute);

app.use('/api/time-series-data', timeSeriesDataRoute);

// // Socket test
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
//   setInterval(()=>{
//     socket.emit('number', parseInt(Math.random()*10));
//   }, 1000);
// });

http.listen(port,()=>{
  console.log("Listening on port ", port);
});

