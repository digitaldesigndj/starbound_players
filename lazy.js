 var Lazy = require('lazy');
    var spawn = require('child_process').spawn;
    var iptables = spawn('iptables', ['-L', '-n', '-v']);

    console.log( Lazy(iptables.stdout)
        .lines
        .map(String)
        .skip(2) // skips the two lines that are iptables header 
 );