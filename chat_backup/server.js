var http = require('http');
var $ = require('jquery');
var WSServer = require('websocket').server;

var url = require('url');
var clientHtml = require('fs').readFileSync('client.html');

var plainHttpServer = http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html'});
	res.end(clientHtml);
}).listen(8888);

var webSocketServer = new WSServer({httpServer: plainHttpServer});
var accept = ['http://192.168.33.5/', '192.168.33.5'];

webSocketServer.on('request', function (req) {
	req.origin = req.origin || '*';
	if (accept.indexOf(url.parse(req.origin).hostname) === -1) {
		req.reject();
		console.log(req.origin + ' access not allowed.');
		return;
	}

	var websocket = req.accept(null, req.origin);

	websocket.on('message', function(msg) {
		console.log('"' + msg.utf8Data + '" is recieved from ' + req.origin + '!');
		if (msg.utf8Data === 'Hello') {
			websocket.send('sended from WebSocket Server');
		}
	});

	websocket.on('close', function (code,desc) {
		console.log('connection released! :' + code + ' - ' + desc);
	});
});
