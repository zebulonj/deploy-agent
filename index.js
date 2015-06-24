'use strict';

import ServerFactory from 'gith';

const agent = ServerFactory.create( 9001 );

agent()
	.on( 'all', function( payload ) {
		console.log( "Push:", payload );
	});

console.log( "Listening..." );