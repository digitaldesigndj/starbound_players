// Reads the log once and writes files
fs = require('fs');

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

update_players_list();
setInterval( update_players_list, 30000 );

function update_players_list() {
	data = fs.readFileSync('/root/Starbound/linux64/starbound_server.log')
	
	lines = data.toString().split("\n");
	
	players = [];
	players_on = [];
	
	for ( i = 0; i < lines.length - 1; ++i ) {
		// console.log( i );
		// console.log( lines[i] );
		// console.log( lines[i].indexOf("Info: Client ") );
		if( lines[i].indexOf("Info: Client ") === 0 ) {
	/*
			console.log( i );
			console.log( lines[i] );
			console.log( lines[i].split(' ').length );
			console.log( msg[msg.length-1] );
	*/
			msg = lines[i].split(' ');
			if( msg[msg.length-1] === 'connected' ) {
				// console.log( lines[i] );
				// console.log( get_user( lines[i] ) );
				players_on.push( get_user( lines[i] ) );
				players.push( get_user( lines[i] ) );
			}
			if( msg[msg.length-1] === 'disconnected' ) {
				// console.log( lines[i] );
				players_on.remove( get_user( lines[i] ) );
			}
			
		}
	}
	
	fs.writeFile( '/var/www/boundstar.com/public_html/players.json', JSON.stringify( players_on , null, 4 ), function( err ) {
		if(err) {
			console.log(err);
		} else {
			console.log("JSON players file saved");
		}
	});
	
	fs.writeFile( '/var/www/boundstar.com/public_html/players_list.json', JSON.stringify( players , null, 4 ), function( err ) {
		if(err) {
			console.log(err);
		} else {
			console.log("JSON players list file saved");
		}
	}); 
}

function get_user( string ) {
	var start_pos = string.indexOf('\'') + 1;
	var end_pos = string.indexOf('\'',start_pos);
	return string.substring(start_pos,end_pos);
}

