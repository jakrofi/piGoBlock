 (function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
  
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
  
  
    // Functions for block with type 'w' will get a callback function as the
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.my_first_block = function() {
        // Code that gets executed when the block is run
        var net = require('net');
        var client = new net.Socket();

        /*var myserver = net.createServer(function(c) {
            c.on('end', function()  {
            c.write('client disconnected');
         });
   
         myserver.listen(8124, function() {
            //'listening' listener
            console.log('server bound');
         });*/
  
    };
    // Block and block menu descriptions
    var descriptor = {
    blocks: [
        
        [' ', 'my first block', 'my_first_block'],
    ]
  
};
  
  // Register the extension
  ScratchExtensions.register('My first extension', descriptor, ext);
  })({});



