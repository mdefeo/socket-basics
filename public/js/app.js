var socket 		=	io(),
	$form		= 	$('#message-form'),
	$message 	=	$('input[name="message"]'),
	$response	=	$('#response'),
	response 	=	document.getElementById("response"),
	room 		=	getQueryVariable('room');

socket.on('connect', function() {
	console.log('Connected to socket.io server.');
	socket.emit('joinRoom', {
		name: getQueryVariable('name') || 'Anonymous',
		room: room,
		email: getQueryVariable('email')
	});
});

socket.on('message', function(message) {
	var $messages 	= 	$('.messages');
	console.log('New message:');
	$response.append('<li class="message"> <p class="message_sender"><strong>' + message.name + '</strong></p> <p>' + message.text + '</p><p class="message_time">' + message.timestamp + '</p></li>');
	response.scrollIntoView(false);
});

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}

	return undefined;
}

$(function() {
	$('.room-title').text(room);
	$form.on('submit', function(e) {
		e.preventDefault();
		if($message.val().length > 0) {
			socket.emit('message', {
				text: $message.val()
			});
		}
		$message.val('');
	});
});

