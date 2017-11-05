(function(doc) {
  let UI_messagesBox = doc.getElementById('messages'),
      UI_nickname = doc.getElementById('nickname'),
      UI_messageText = doc.getElementById('text'),
      UI_inputForm = doc.getElementById('input-form'),
      serverUrl = 'http://192.168.1.3:4040';
  
  // Establish new connection
  let socket = io.connect(serverUrl, {
    'forceNew': true
  });

  // Receive welcome message from the server
  socket.on('messages', function (data) {    
    render(data);
  });

  // Display messages
  function render(data) {
    let html = data.map(function (message, index) {
      return (`
            <div class="message">
              <strong>${message.nickname} says:</strong>
              <p>${message.text}</p>
            </div>
          `);
    }).join(' ');

    UI_messagesBox.innerHTML = html;

    UI_messagesBox.scrollTop = UI_messagesBox.scrollHeight;
  }

  // Add message
  function addMessage(e) {   
    
    //Stop reloading the page
    e.preventDefault();
    
    let message = {
      nickname: UI_nickname.value,
      text: UI_messageText.value
    };    

    // Disabling nickname edition after first message
    UI_nickname.disabled = true;

    // Emit event to the server
    socket.emit('add-message', message);

    return false;
  }
  
  // Event listeners
  UI_inputForm.addEventListener('submit', addMessage);  
  
})(document);
