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

	deploy( subject );

	return function ( req, res, next ) {
		console.log( "Hooked!", req.body );
		subject.onNext( req.body );

		res.status( 200 ).end();
	};
};