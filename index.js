'use strict';

import express from 'express';
import BodyParser from 'body-parser';

const app = express();

// Middleware
app.use( BodyParser.json() );

// Log all requests and return 200 status.
app.use( function( req, res ) {
	console.log( "Request:", req.method, req.url, req.body );

	res.status( 200 ).end();
});

app.listen( 9001 );

console.log( "Listening..." );