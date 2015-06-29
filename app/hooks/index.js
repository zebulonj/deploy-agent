'use strict';

/**
 * Web-hook Adapter
 *
 * @param Rx
 * @param deploy {} Deploy script.
 * @returns {Function}
 */
export default function({ Rx, deploy }) {
	const subject = new Rx.Subject();

	subject.subscribe( function( payload ) {
		console.log( "Hooked!", payload );

		deploy( payload );
	});

	return function ( req, res, next ) {
		subject.onNext( req.body );

		res.status( 200 ).end();
	};
};