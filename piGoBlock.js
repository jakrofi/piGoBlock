new (function () {
     //var ext = this;
     
     // a variable to set the color of the 'LED' indicator for the extension on the Scratch editor
     var boardStatus = 0; //  0:not ready(RED), 1:partially ready or warning(YELLOW), 2: fully ready(GREEN)
     
    
     ext._shutdown = function ()
     {
        console.log('Sending reset to board index ' + index);
        socket.send('resetBoard');
     
     };
     
     // Status reporting code - part of boilerplate provided by Scratch
     // Set the 'LED' on the Scratch Editor
     ext._getStatus = function ()
     {
        return
        {
            status: boardStatus,
            msg: 'Ready'
        };
     };
     
     /*****************************************************************************************************/
     /***********************************   Scratch Program Block Handlers, ******************************/
     /*****************************************************************************************************/
     
     // Associate a handler for each block described in the blocks section below
     
     /*******************************
      **** Command Block Handlers ****
      *******************************/
     
     // Accepts IP Address and Port information for each board that the user adds
     // The associated scratch block is a 'wait' command block.
     // We don't want Scratch to continue until the socket is open bidirectionally.
     // When socket.onopen is called the callback is returned so that scratch can proceed processing
     ext.setBoard = function (ipAddress, port, callback)
     {
        var timeoutID; // need to set a timeout when a socket is created because we are using a 'wait' block
     
        console.log('set IP Address: ' + ipAddress, port);
     
     
        // This is a confirmed unique entry. Create a websocket for this board
        var socket = new WebSocket('ws://' + ipAddress + ':' + port);
     
     
        // start the timer for a server reply - we wait for up to 2 seconds for the reply
        timeoutID = window.setTimeout(noServerAlert, 2000);
     
     
        // attach an onopen handler to this socket. This message is sent by a servers websocket
        socket.onopen = function (event)
        {
            window.clearTimeout(timeoutID);
     
            console.log('onopen message received');
            // change the board status to green with the first board added, since we don't know ahead of time
            // how many boards are attached
            boardStatus = 2;
            socket.send('Pi2GoLiteOnline');
            callback(); // tell scratch to proceed processing
        };
     
        function noServerAlert()
        {
            //alert("Server not responding. Did you start XiServer for this board?" +
           //"Please start the server, reload this page and try again");//createAlert(20, boardID);
            boardStatus = 0;
        }

     };// ext.setboard
     
          
     
     // Digital output command block
     ext.forward = function (speed)
     {
        // strip index number off of message to determine value to send to server
        var msg = 'forward/' + speed;
        sendCommand(msg);
     };//ext.forward
     
     
     
     
     
     /*******************************
      **** Response Block Handlers ****
      *******************************/
     
     
     
     
     
     /*******************************
      **** Helper functions ****
      *******************************/
     
     // This function will check to see if a board has been established and if it has, will send a command
     // message to the server
     function sendCommand(msg)
     {
        socket.send(msg);
        return ;
     
     }
     
     
     // Block and block menu descriptions
     var descriptor = {
     blocks: [
              ['w', 'IPAddress/Port: %s : %s', 'setBoard', 'localhost', '1234'],
              [' ', 'Forward: Set Speed= %n', 'forward', '30']
            
            ],
     
     url: 'https://github.com/jakrofi/Pi2Go-Scratch_Blocks/tree/gh-pages'
     };
     
     
     // Register the extension
     ScratchExtensions.register('Akrofi-Pi2Go-Scratch_Blocks', descriptor, ext);
     
     })();