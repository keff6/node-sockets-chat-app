let express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

// Messages Store Array
let messages = [{
  id:1,
  text: "Welcome to the chat!",
  nickname: 'bot'
}];

// Express middleware
app.use(express.static('client'));

// Routing
app.get('/', function(req, res){
  res.render('index.html');
});

// Open conection to socket
io.on('connection', function(socket){
  console.log("New guest joined. IP: "+socket.handshake.address);
  
  // Emit message to connected clients
  socket.emit('messages', messages);
  
  // Manage messages
  socket.on('add-message',function(data){
    messages.push(data);
    
    // then emit to all the clients again
    io.sockets.emit('messages', messages);
  });
});

// Create server using express
server.listen(4040, function(){
  console.log('Server running on http://localhost:4040');
});



