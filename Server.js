(function(ext) {
 
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    var Socket;
    var ipGobal= '0';
 
    ext.set_Server = function(ipAddress, port, callback) {
        // Code that gets executed when the block is run
        var timeoutID;
        //ipGobal = ipAddress;
        Socket = new WebSocket('ws://' + ipAddress + ':' + port+ '/');
        timeoutID = window.setTimeout(noServerAlert, 2000);
 
        Socket.onopen = function (event) {
            window.clearTimeout(timeoutID);
            Socket.send('Xi4sOnline');
            callback();
        };
 
        function noServerAlert() {
            return;
        }

    };
 
    //Stop function
    ext.stop = function (){
        var msg= 'stop/';
        sendCommand(msg);
    }
 
    //Forward function
    ext.forward= function (speed){
        var msg= 'forward/' + speed;
        sendCommand(msg);
 
    };
 
    //Reverse function
    ext.reverse= function (speed){
        var msg= 'reverse/' + speed;
        sendCommand(msg);
 
    };
 
    //spinLeft function
    ext.spinLeft= function (speed){
        var msg= 'spinLeft/' + speed;
        sendCommand(msg);
    };
 
    //spinRight function
    ext.spinRight= function (speed){
        var msg= 'spinLeft/' + speed;
        sendCommand(msg);
    };
 

 
 
    function sendCommand(msg)
    {
        /*if(ipGobal === 'localhost' || ipGobal === '0')
        {
            alert("IP Address for this board was not set.");
        }
 
        else*/
        Socket.send(msg);
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['w', 'Set Server IPAddress/Port: %s : %s', 'set_Server', 'localhost', '1234'],
            [' ', 'Stop', 'stop'],
            [' ', 'Forward- Set Speed= %n', 'forward', '30'],
            [' ', 'Reverse- Set Speed= %n', 'reverse', '30'],
            [' ', 'Spin Right- Set Speed= %n', 'spinLeft', '30'],
            [' ', 'Spin Left- Set Speed= %n', 'spinRight', '30'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});