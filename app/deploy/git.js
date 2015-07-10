import fs from 'fs';
import Rx from 'rx';

import exec from './exec';

export function clone( url, path ) {
	return exec( `git clone --mirror ${ url } ${ path }` )
		.catch( function( err ) {
			if ( /already exists/.test( err.message ) ) {
				return Rx.Observable.return( true );
			}
			else {
				return Rx.Observable.throw( err );
			}
		});
}

export function update( repo ) {
	return exec( `git remote update`, { cwd: repo });
}

export function archive( branch, releasePath, repo ) {
	return exec( `git archive ${ branch } | tar -x -C ${ releasePath }`, { cwd: repo });
}

export default {
	clone,
	update,
	archive
};