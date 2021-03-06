(function (doc) {
  let UI_messagesBox = doc.getElementById('messages'),
    UI_nickname = doc.getElementById('nickname'),
    UI_messageText = doc.getElementById('text'),
    UI_inputForm = doc.getElementById('input-form'),
    UI_btnInfo = doc.getElementById('btn-info'),
    UI_btnCloseInfo = doc.getElementById('btn-close-modal'),
    serverUrl = 'http://192.168.1.2:4040';

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
    let countMessages = data.length;
    let html = data.map(function (message, index) {
      return (`
            <div class="message row">
              <div class="name-tag">
                ${message.nickname}:
              </div>
              <div class="text-globe left-arrow ${countMessages === index+1 ? 'animated bounceInLeft':''} ">
                ${message.text}
              </div>              
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
    
    // Clean text area
    UI_messageText.value = "";

    return false;
  }

  function overlay() {
    el = document.getElementById("modal-about");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  // Event listeners
  UI_inputForm.addEventListener('submit', addMessage);
  UI_btnInfo.addEventListener('click', overlay);
  UI_btnCloseInfo.addEventListener('click', overlay);

})(document);
