(function(ext)
 {   var net = require('net');
     var myserver = net.createServer(function(c)
    {
        c.on('end', function()
        {
            c.write('client disconnected');
        });
                                     
        c.write('hello World\r\n');
                                     
    
                                     
        // Cleanup function when the extension is unloaded
        ext._shutdown = function() {};
  
        // Status reporting code
        // Use this to report missing hardware, plugin or unsupported browser
        ext._getStatus = function()
        {
            return {status: 2, msg: 'Ready'};
        };
  
        // Functions for block with type 'w' will get a callback function as the
        // final argument. This should be called to indicate that the block can
        // stop waiting.
        ext.my_first_block = function()
        {
           // Code that gets executed when the block is run
           c.write('first block\r\n');
        };
         // Block and block menu descriptions
         var descriptor = {
         blocks: [
                   [' ', 'my first block', 'my_first_block'],
                  ]
          };
    }
                                     
    myserver.listen(8124, function()
    {
        //'listening' listener
        console.log('server bound');
    });

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
 })({});



 