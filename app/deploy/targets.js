import path from 'path';

export default function({ Rx, source }) {
	console.log( "Loading deploy targets from " + source );

	return Rx.Observable.return({
		name:		'deploy-agent',
		origin:		'git@github.com:zebulonj/deploy-agent.git',
		branch: 	'master',
		root:		path.resolve( __dirname, '../../tmp' ),
		repo:		path.resolve( __dirname, '../../tmp/.git' ),
		shared:		['logs'],
		restart:	'service php5-fpm restart'
	});
};