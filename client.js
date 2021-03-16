const net = require('net');

const client = net.createConnection({ port:3000 }, () => {
    console.log('CLIENT: I am connected.');
    client.write('CLIENT: Hello, i am client!');
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});

client.on('end', () => {
    console.log('CLIENT: I am disconnected.');
});
