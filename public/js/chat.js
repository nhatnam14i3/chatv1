window.onload = function() {
	
    var messages = [];
    var socket = io.connect('http://127.0.0.1:1234');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += ' <div class="message new"><figure class="avatar"><img src="images/icon.png" /></figure><b><u><i>' + (messages[i].username ? messages[i].username : 'Server') + ' </b></u></i>Nói: ';
                html += messages[i].message + '<br /></div>';
            }
            content.innerHTML = html;
        } else {
            console.log("Chắc chắn xảy ra một lỗi:", data);
        }
    });

    sendButton.onclick = function() {
        
            var text = field.value;
			var ID = socket.id;
			d = new Date();
			m = d.getMinutes();
            socket.emit('send', { message: text, username: ID + '<br /><div class="timestamp">' + d.getHours() + ':' + m + '</div>' });
			
    };
}