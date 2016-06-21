var socket 	=	io();

socket.on('connect', function() {
	console.log('Connected to socket.io server.');
});

socket.on('message', function(message) {
	console.log('New message:');
	console.log(message.text);
});

$(function() {
	var $form		= 	$('#message-form'),
		$message 	=	$('input[name="message"]'),
		$response	=	$('#response'),
		$msg  		=	'';
	$form.on('submit', function(e) {
		e.preventDefault();
		$msg 		=	$message.val() + "<br>";
		//$response.append($msg);
		socket.emit('message', {
			text: $msg
		});
		$message.val('');
	});
});