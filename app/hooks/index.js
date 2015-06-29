'use strict';

export default function() {
	return function WebHook( req, res, next ) {
		console.log( "Hooked!" );

		next();
	};
};