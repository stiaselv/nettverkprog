import * as http from 'http'

function boop() {
    var x = form.getElementById("boop");    
    return x;
}

function resultBoop(){
    var x = boop();
    x.write(x);
}

function outputBoop() {
    var x = boop();
    document.getElementById("btnSend").addEventListener("click", function(){
        x.write(x);
    })
    
}

function main() {
    const host = "localhost";
    const port = 8080;
    const net = require("net");

    const server = net.createServer();
    server.listen(port, host, () => {
        console.log("TCP Server is running on port " + port + ".");
    })

    let sockets = [];

    server.on("connection", function(sock) {
        console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
        sockets.push(sock);

        sock.on("data", function(data) {
            console.log("DATA " + sock.remoteAddress + ": " + data);
            // Write the data back to all the connected, the client will recieve it as data from the server
            sockets.forEach(function(sock, index, array) {
                sock.write(sock.remoteAddress + ":" + sock.remotePort + " said " + data + "\n");
            });
        });

        // Add a 'close' event handler to this instance of socket
        sock.on("close", function(data) {
            let index = sockets.findIndex(function(o) {
                return o.remoteAddress === sock.removeAllListeners && o.remotePort === sock.remotePort;
            })
            if (index !== -1) sockets.splice(index, 1);
            console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
        })
    })

}