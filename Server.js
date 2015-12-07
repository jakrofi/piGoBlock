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
 
        Socket.onmessage= function (message){
            alert("HERE!!!!");
            var msg = message.data.split('/');
            createAlert(msg.data);
            alert("NO DOWN HERE!!!!");
        };
 
 
        function noServerAlert() {
            return;
        }

    };
 
//***********************************************************************************
//                                 MOTOR FUNCTIONS
//***********************************************************************************

    ext.motorInstructions= function(){
        alert("BOOYA");
 
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
        createAlert(msg);

 
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
 
    //turnForward function
    ext.turnForward= function (leftSpeed, rightSpeed){
        var msg= 'turnForward/' + leftSpeed + '/' + rightSpeed;
        sendCommand(msg);
    };

    //turnReverse function
    ext.turnReverse= function (leftSpeed, rightSpeed){
        var msg= 'turnReverse/' + leftSpeed + '/' + rightSpeed;
        sendCommand(msg);
    };
 
    //go function
    ext.goM= function (leftSpeed, rightSpeed){
        var msg= 'goM/' + leftSpeed + '/' + rightSpeed;
        sendCommand(msg);
    };

    //go function
    ext.go= function (speed){
        var msg= 'go/' + speed;
        sendCommand(msg);
    };
 
 
 //***********************************************************************************
 //                                 SERVO FUNCTIONS
 //***********************************************************************************
    ext.startServos= function(){
        var msg= 'startServos/';
        sendCommand(msg);
    };
 
    ext.stopServos= function(){
        var msg= 'stopServos/';
        sendCommand(msg);
    };

    ext.setServo= function(Servo, Degrees){
        var msg= 'setServos/'+ Servo + '/' + Degrees;
        sendCommand(msg);
    };
 
 
 //***********************************************************************************
 //                                 RGB LED Functions
 //***********************************************************************************
 
    ext.setLED= function (LED, Red, Green, Blue){
        var msg= 'setLED/' + LED + '/' + Red + '/' + Green + '/' + Blue;
        sendCommand(msg);
    };
 
    ext.setAllLEDs= function (Red, Green, Blue){
        var msg= 'setAllLEDs/' + Red + '/' + Green + '/' + Blue;
        sendCommand(msg);
    };
 
 
    ext.LsetLED= function (LED, value){
        var msg= 'LsetLED/' + LED + '/' + value;
        sendCommand(msg);
    };
 
    ext.LsetAllLEDs= function (value){
        var msg= 'LsetAllLEDs/' + value;
        sendCommand(msg);
    };
 
 //***********************************************************************************
 //                                 IR Sensor Functions
 //***********************************************************************************
    ext.irLeft= function(){
        var msg= 'irLeft/';
        sendCommand(msg);
    };

    ext.irRight= function(){
        var msg= 'irRight/';
        sendCommand(msg);
    };
 
    ext.irLeftLine= function(){
        var msg= 'irLeftLine/';
        sendCommand(msg);
    };
 
    ext.irRightLine= function(){
        var msg= 'irRightLine/';
        sendCommand(msg);
    };
 //***********************************************************************************
 //                                 UltraSonic Functions
 //***********************************************************************************
    ext.ultraSonic= function(){
        var msg= 'ultraSonic/';
        sendCommand(msg);
    };
 
 
 //***********************************************************************************
 //                                 SEND COMMAND FUNCTION
 //***********************************************************************************
 
    function createAlert(msg)
    {
        alert(msg[0] + "= " + msg[1]);
 
    }
 
    function sendCommand(msg)
    {
 
        Socket.send(msg);
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            //Motor Blocks
            ['w', 'Set Server IPAddress/Port: %s : %s', 'set_Server', 'localhost', '1234'],
            [' ', 'MOTOR BLOCK INSTRUCTIONS.', 'motorInstructions'],
            [' ', 'Stop', 'stop'],
            [' ', 'Forward- Set Speed= %n', 'forward', '30'],
            [' ', 'Reverse- Set Speed= %n', 'reverse', '30'],
            [' ', 'Spin Right- Set Speed= %n', 'spinLeft', '30'],
            [' ', 'Spin Left- Set Speed= %n', 'spinRight', '30'],
            [' ', 'Turn Forward- Set Right speed= %n : Set Left speed= %n', 'turnForward', '30', '30'],
            [' ', 'Turn Reverse- Set Right speed= %n : Set Left speed= %n', 'turnReverse', '30', '30'],
            [' ', 'Go- Set Right speed= %n : Set Left speed= %n', 'goM', '30', '30'],
            [' ', 'Go- Set Speed= %n', 'go', '30'],
            // Servo Blocks
            [' ', 'Start Servos', 'startServos'],
            [' ', 'Stop Servos', 'stopServos'],
            [' ', 'Set Servos- Servo:%m.servoNum  Degrees= %n', 'setServo', '1', '30'],
            // LED Blocks
            [' ', 'Set LED:%m.LEDNum Red:%n, Green:%n, Blue:%n', 'setLED', '1', '1000', '1000', '1000'],
            [' ', 'Set All LEDs- Red:%n, Green:%n, Blue:%n', 'setAllLEDs', '1000', '1000', '1000'],
            [' ', 'Set White LED:%m.LEDNum Value:%n', 'LsetLED','1', '1000'],
            [' ', 'Set All White LEDs- Value:%n', 'LsetAllLEDs','1000'],
            // IR Sensor Blocks
            [' ', 'Left IR Obstacle sensor', 'irLeft'],
            [' ', 'Right IR Obstacle sensor', 'irRight'],
            [' ', 'Left IR Line sensor', 'irLeftLine'],
            [' ', 'Right IR Line sensor', 'irRightLine'],
            // UltraSonic Blocks
            [' ', 'Get Sonar Distance', 'ultraSonic'],
        ],
 
    menus: {
        LEDNum: ['1', '2', '3', '4'],
        servoNum: ['1', '2'],
        },
 
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});


/*if(ipGobal === 'localhost' || ipGobal === '0')
        {
            alert("IP Address for this board was not set.");
        }
 
        else*/