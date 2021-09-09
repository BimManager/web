#!/bin/node
const net = require('net');

const sock = net.connect(8080);
process.stdin.pipe(sock);
sock.pipe(process.stdout);
