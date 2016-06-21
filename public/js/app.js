var socket 		=	io(),
	$form		= 	$('#message-form'),
	$message 	=	$('input[name="message"]'),
	$response	=	$('#response'),
	msg 		=	'',
	scrolled 	= 	false;

socket.on('connect', function() {
	console.log('Connected to socket.io server.');
});

socket.on('message', function(message) {
		console.log('New message:');
		$response.append('<p><span class="icon"></span>' + message.text + '<br><i>' + message.time + '</i></p>');
});

$(function() {
	$form.on('submit', function(e) {
		e.preventDefault();
		msg 	=	$message.val();
		if(msg.length > 0) {
			socket.emit('message', {
				text: msg
			});
			$message.val('');
			var res = document.getElementById("response");
			res.scrollTop = res.scrollHeight;
		}
	});        
});

