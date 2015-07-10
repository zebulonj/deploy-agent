'use strict';

import path from 'path';
import moment from 'moment';
import Rx from 'rx';

import fs from './fs';
import git from './git';

function timestamp() {
	return moment().format( 'YYYYMMDDhhmmss' );
}

/**
 *
 * @param targets
 * @returns {Function}
 */
export default function({ targets }) {
	/**
	 * @param payloads {Observable}
	 */
	return function deployScript( payloads ) {
		const releaseRoot = path.resolve( __dirname, '../../tmp/releases' );

		console.log( "Release Root:", releaseRoot );

		function prepare( target ) {
			const { root } = target;

			target.current = path.resolve( root, 'current' );
			target.release = path.resolve( root, 'releases', timestamp() );

			return target;
		}

		// Clone the repository if not already mirrored.
		// Update the mirror.
		// Create release directory.
		// Export appropriate branch to release directory.
		// Link shared directories.
		// Link current release.
		// Restart server.

		payloads
			.concatMap( () => targets )
			.map( prepare )
			.concatMap( function( target ) {
				console.log( "Deploying...", target );

				let seq = git.clone( target.origin, target.repo )
					.concatMap( () => git.update( target.repo ) )
					.concatMap( () => fs.mkdir( target.release ) )
					.concatMap( () => git.archive( target.branch, target.release, target.repo ) )
					.concatMap( () => fs.link( target.release, target.current ) )
					.tap( () => console.log( "Deployed:", target.name ) )

				return seq;
			})
			.subscribe( () => {} );
	};
};