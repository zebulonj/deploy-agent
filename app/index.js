'use strict';

import path from 'path';

import express from 'express';
import BodyParser from 'body-parser';

import Rx from 'rx';

import HookFactory from './hooks';
import DeployScript from './deploy';
import DeployTargets from './deploy/targets';

const targets = DeployTargets( path.resolve( __dirname, '../tasks' ) );

const app = express();

// Middleware
app.use( BodyParser.json() );

// Log all requests.
app.use( function( req, res, next ) {
	console.log( "Request:", req.method, req.url, req.body );

	next();
});

// Webhooks
app.post( '/', HookFactory({ Rx, deploy: DeployScript({ targets }) }) );

app.listen( 9001 );

console.log( "Listening..." );