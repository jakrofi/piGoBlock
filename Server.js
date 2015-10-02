 new (function() {
  var ext = this;
  var socket;
  // Cleanup function when the extension is unloaded
  ext._shutdown = function() {};
  
  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  ext._getStatus = function() {
  return {status: 2, msg: 'Ready'};
  };
      
  ext.setBoard = function (ipAddress, port, callback) {
  var timeoutID; // need to set a timeout when a socket is created because we are using a 'wait' block
      
 
  // This is a confirmed unique entry. Create a websocket for this board
  socket = new WebSocket('ws://' + ipAddress + ':' + port);
      
     
  // start the timer for a server reply - we wait for up to 2 seconds for the reply
  timeoutID = window.setTimeout(noServerAlert, 2000);
      
      
  // attach an onopen handler to this socket. This message is sent by a servers websocket
  socket.onopen = function (event) {
      window.clearTimeout(timeoutID);
      if (debugLevel >= 1)
      console.log('onopen message received');
      // change the board status to green with the first board added, since we don't know ahead of time
      // how many boards are attached
    
      callback(); // tell scratch to proceed processing
  };

  function noServerAlert() {
      return;
 }


  ext.forward = function (speed) {
      var msg = 'forward/' +speed;
      sendCommand(msg);
    };
  
      
      
  function sendCommand(msg) {
      // send out message
      socket.send(msg);
       return;
    
  }
      
  // Block and block menu descriptions
  var descriptor = {
  blocks: [
      ['w', 'IPAddress/Port: %s : %s', 'setBoard', 'localhost', '1234'],
      [' ', 'Forward: Speed= %n', 'forward', '128']
  ]
  };
  
  // Register the extension
  ScratchExtensions.register('Sample_Pi2GoLite_Server', descriptor, ext);
  })();