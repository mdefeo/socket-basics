var PORT 		=	process.env.PORT || 3000,
	express 	=	require('express'),
	app 		=	express(),
	http 		=	require('http').Server(app),
	io	 		=	require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);
		//sends to everyone but sender
		//socket.broadcast.emit('message', message);
		io.emit('message',message);
	});

});


http.listen(PORT, function() {
	console.log('Server started.');
});
