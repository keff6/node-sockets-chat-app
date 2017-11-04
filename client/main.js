// Establish new connection
var socket = io.connect('http://192.168.1.3:4040',{'forceNew':true});

// Receive welcome message from the server
socket.on('messages', function(data){
  console.log(data);
  render(data);
});

// Display messages
function render(data){
  var html = data.map(function(message, index){
    return (`
            <div class="message">
              <strong>${message.nickname} says:</strong>
              <p>${message.text}</p>
            </div>
          `);
  }).join(' ');
  
  document.getElementById('messages').innerHTML = html;
  
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

// Add message
function addMessage(e){
  var message = {
    nickname: document.getElementById('nickname').value,
    text: document.getElementById('text').value
  };
  
  document.getElementById('nickname').style.display = 'none';
  
  // Emit event to the server
  socket.emit('add-message', message);
  
  return false;
}