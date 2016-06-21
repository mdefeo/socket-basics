var socket 		=	io(),
	$form		= 	$('#message-form'),
	$message 	=	$('input[name="message"]'),
	$response	=	$('#response'),
	$msg  		=	'';

socket.on('connect', function() {
	console.log('Connected to socket.io server.');
});

socket.on('message', function(message) {
	console.log('New message:');
	$response.append('<p>' + message.text + '</p>');
});

$(function() {
	$form.on('submit', function(e) {
		e.preventDefault();
		socket.emit('message', {
			text: $message.val()
		});
		$message.val('');
	});
});