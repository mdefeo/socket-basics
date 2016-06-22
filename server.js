var PORT 		=	process.env.PORT || 3000,
	express 	=	require('express'),
	app 		=	express(),
	http 		=	require('http').Server(app),
	io	 		=	require('socket.io')(http),
	sanitize 	= 	require('sanitize-html'),
	moment		=	require('moment'),
	curTime;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {

	socket.on('message', function(message) {
		message.text 	=	sanitize(message.text);
		console.log('Message received: ' + message.text);
		//sends to everyone but sender
		//socket.broadcast.emit('message', message);
		message.time 	=	moment().local().format('h:mm:ss a');  
		io.emit('message',message);
	});

});


http.listen(PORT, function() {
	console.log('Server started.');
});
