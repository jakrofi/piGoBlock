(function(ext) {
 
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    var Socket;
    ext.set_Server = function(ipAddress, port, callback) {
        // Code that gets executed when the block is run
        var timeoutID;
        Socket = new WebSocket('ws://' + ipAddress + ':' + port);
        timeoutID = window.setTimeout(noServerAlert, 2000);
 
        socket.onopen = function (event) {
            window.clearTimeout(timeoutID);
            callback();
        };
 
        function noServerAlert() {
            return;
        }

    };
 
    ext.forward= function (speed){
        var msg= 'forward/' + speed;
 
 };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['w', 'Set Server IPAddress/Port: %s : %s', 'set_Server', 'localhost', '1234'],
            [' ', 'Forward. Set Speed= %n', 'forward', '30'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});