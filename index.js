#!/bin/node

var term = require( 'terminal-kit' ).terminal ;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

term.grabInput( { mouse: 'button' } ) ;

function exitHandler() {
	term.grabInput( false );
    process.exit();
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

term.on( 'key' , function( name , matches , data ) {
	if ( name === 'CTRL_C' ) { terminate() ; }
});

var items = [ ' ⏮ ' , ' ⏹ ' , ' ► ', ' ⏸ ' , ' ⏭ ', ' 🔀 ' ] ;

var options = {
	y: 1,
	style: term.inverse,
	selectedStyle: term.inverse.blue,
	separator: ''
}

function render () {
	term.clear();
	term.singleLineMenu( items , options , function( error , response ) {
		switch(response.selectedIndex) {
			case 0: exec('cmus-remote -r'); break;
			case 1: exec('cmus-remote -s'); break;
			case 2: exec('cmus-remote -p'); break;
			case 3: exec('cmus-remote -u'); break;
			case 4: exec('cmus-remote -n'); break;
			case 5: exec('cmus-remote -S'); break;
		}
		render();
	}) ;
}

render();
