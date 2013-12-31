/*
// define your terminator for easy reference, changes
var msgTerminator = '\n';


    // see if there is one or more complete messages
    if (buf.indexOf(msgTerminator) >= 0) {
        // slice up the buffer into messages
        var msgs = data.split(msgTerminator);

        for (var i = 0; i < msgs.length - 2; ++i) {
            // walk through each message in order
            var msg = msgs[i];

            // pick off the current message
            console.log('Data in server, sending to handle()');
            // send only the current message to your handler
            worker.handle(msg, socket);
        }

        buf = msgs[msgs.length - 1];  // put back any partial message into your buffer
    }
});
*/

var fs = require('fs'),
    bite_size = 512,
    readbytes = 0,
    file;

fs.open('/root/Starbound/linux64/starrybound/log.txt', 'r', function(err, fd) { file = fd; readsome(); });

function readsome() {
    var stats = fs.fstatSync(file); // yes sometimes async does not make sense!
    if(stats.size<readbytes+1) {
    	console.log('---------------- TICK ------------' );
        setTimeout(readsome, 3000);
    }
    else {
        fs.read(file, new Buffer(bite_size), 0, bite_size, readbytes, processsome);
    }
}

var incomplete_chunk = '';

function processsome(err, bytecount, buff) {
//	var regex = \Info:\sClient\s'(.*?)\sdisconnected\;

	// console.log( buff.toString('UTF-8').split("\n") );
	
	var data = buff.toString('UTF-8').split("\n");

	for ( i = 0; i < data.length - 1; ++i ) {
		console.log( bytecount );
//		if( bytecount !== 512 ) {
			var lines = data[i].toString('UTF-8');
			console.log( lines );
			console.log( lines.length );
			console.log( '----' );
/*
			for ( i = 0; i < lines.length - 1; ++i ) {
				console.log( lines[i] );
			}
*/
//		}

	}
	
/*
	fs.writeFile( '/var/www/boundstar.com/public_html/players.json', JSON.stringify( data , null, 4 ), function( err ) {
		if(err) {
			console.log(err);
		} else {
			console.log("JSON players file saved");
		}
	});
*/



/*
	if ( buff.toString().indexOf(msgTerminator) >= 0 ) {
        // slice up the buffer into messages
        var msgs = data.split(msgTerminator);
        console.log( msgs );
    }
*/
    
    // console.log( buff.toString().split('Info: Client ') );
    
    
    //console.log('Read', bytecount, 'and will process it now.');

    // Here we will process our incoming data:
        // Do whatever you need. Just be careful about not using beyond the bytecount in buff.
//         console.log( buff.toString( 'utf-8', 0, bytecount ).split("\n") );
/* 		console.log( buff.toString( 'ascii' ) ); */
		
		
		// .split(/\r\n|[\n\r\u0085\u2028\u2029]/g) );
//    console.log( buff.toString( 'utf-8', 0, bytecount ).split(/\r\n|[\n\r\u0085\u2028\u2029]/g) );

    // So we continue reading from where we left:
    readbytes+=bytecount;
    process.nextTick(readsome);
}