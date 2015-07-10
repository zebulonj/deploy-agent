import exec from './exec';

export function mkdir( path ) {
	return exec( `mkdir -p ${ path }` );
}

export function link( source, target ) {
	return exec( `rm -f ${ target }` )
		.concatMap( () => exec( `ln -s ${ source } ${ target }` ) );
}

export default {
	mkdir,
	link
};