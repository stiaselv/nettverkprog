const net = require('net');
const port = 3000;
const wsPort = 3001;

// Creating a server object
const httpServer = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString());
  });

  socket.write('SERVER: Hello! This is server speaking.<br>');
  socket.end('SERVER: Closing connection...<br>');
}).on('error', (err) => {
  console.error(err);
});

// Open server on port 3000
httpServer.listen(port, () => {
  console.log('Server open on', httpServer.address().port);
})
