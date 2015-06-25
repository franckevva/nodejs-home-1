var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Server running at http://127.0.0.1:3000/\n');
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');