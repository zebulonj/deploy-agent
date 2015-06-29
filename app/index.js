'use strict';

import express from 'express';
import BodyParser from 'body-parser';

import HookFactory from './hooks';

const app = express();

// Middleware
app.use( BodyParser.json() );

// Log all requests.
app.use( function( req, res, next ) {
	console.log( "Request:", req.method, req.url, req.body );

	next();
});

// Webhooks
app.post( '/', HookFactory() );

app.listen( 9001 );

console.log( "Listening..." );