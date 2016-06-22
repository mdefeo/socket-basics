var PORT 		=	process.env.PORT || 3000,
	express 	=	require('express'),
	app 		=	express(),
	http 		=	require('http').Server(app),
	io			=	require('socket.io')(http),
	moment		=	require('moment'),
	clientInfo 	=	{};

app.use(express.static(__dirname + '/public'));

function systemMessage(socket,text) {
	socket.emit('message', {
		name: 'System',
		text: text,
		timestamp: moment().local().format('h:mm:ss a')
	});	
}

//Sends current users to provided socket
function sendCurrentUsers(socket) {
	var info 	=	clientInfo[socket.id],
		users 	=	[];

	if(typeof info === 'undefined') {
		return;
	} else {
		Object.keys(clientInfo).forEach(function(socketId) {
			var userInfo = clientInfo[socketId];
			if(info.room === userInfo.room) {
				users.push(userInfo.name);
			}
		});

		return systemMessage(socket,'Current users: ' + users.join(', '));
	}
}
io.on('connection', function(socket) {
	var userData = clientInfo[socket.id];

	socket.on('disconnect', function() {
		if(typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left.',
				timestamp: moment().local().format('h:mm:ss a')
			});
			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req) {
		clientInfo[socket.id]	=	req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined.',
			timestamp: moment().local().format('h:mm:ss a')
		});
		systemMessage(socket,'Welcome to the chat application, ' + req.name + '!');

	});

	socket.on('message', function(message) {
		var userData = clientInfo[socket.id];
		console.log('Message received: ' + message.text);
		if(message.text === '@currentUsers') {
			sendCurrentUsers(socket);
		} else {
			console.log(message);
			message.name 		=	userData.name;
			message.timestamp 	=	moment().local().format('h:mm:ss a');  
			io.to(clientInfo[socket.id].room).emit('message',message);
		}
	});
});

http.listen(PORT, function() {
	console.log('Chat server started.');
});