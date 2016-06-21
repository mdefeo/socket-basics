var PORT 		=	process.env.PORT || 3000,
	express 	=	require('express'),
	app 		=	express(),
	http 		=	require('http').Server(app);

app.use(express.static(__dirname + '/public'));

io.on('connection', function() {
	console.log('User connected via socket.io.');
});


http.listen(PORT, function() {
	console.log('Server started.');
});
