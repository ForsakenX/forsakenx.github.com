var game_update = function( game )
{
	$.get('/status/games.xml',{},function( doc )
	{
		games = $(doc).find('game');
		games.each(function(){
			var game = $( this );
			var ip = game.attr('ip');
			var nick = game.attr('nick');
			var port = game.attr('port');
			var version = game.attr('version');
			var d = get_date( game.attr('started_at') );
			var s = nick+' '+ip+' ('+port+') '+version+' '+d;
			if ( $('#games:contains('+s+')').length ) return;
			var html = '<div id="game_'+ip+'_'+port+'" class="game">'+
					'<a href="fskn://'+ip+':'+port+'">'+s+'</a>'+
				'</div>';
			$('#games').append( html );
		});
		// remove old games
		$('#games .game').each(function(){
			var parts = this.id.split('_');
			var ip = parts[1];
			var port = parts[2];
			if ( ! $(doc).find(
				'game[ip="'+ip+'"]', 
				'game[port='+port+']' 
				).length )
				$( this ).remove();
		});
	},
	'xml');
	// run again in one second
	window.setTimeout( game_update, 1000 );
}
game_update();
