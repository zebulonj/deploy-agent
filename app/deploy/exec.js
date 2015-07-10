import Child from 'child_process';
import Rx from 'rx';

/**
 *
 * @param command
 * @returns {Observable<T>}
 */
export default function( command, options = {}) {
	return Rx.Observable.create( function( observer ) {
		Child.exec( command, options, function( err, stdout, stderr ) {
			if ( err ) {
				return observer.onError( err );
			}

			observer.onNext( stdout );
			observer.onCompleted();
		});
	});
}