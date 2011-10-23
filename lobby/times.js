var times_update = function( time ){
	$.get('/status/times.xml',{},function( doc ){
		times = $(doc).find('time');
		$('#times-count').text( times.length );
		times.each(function(){
			var time = $( this );
			var n = time.attr('nick');
			var d = get_date( time.attr('time') );
			var s = n+' '+d;
			var key = 'time_' + n + "_" + time.attr('time');
			if ( $('#times:contains('+s+')').length ) 
				return;
			var html = '<div id="'+key+'" class="time">'+s+'</div>';
			$('#times').append( html );
		});
		// remove old times
		$('#times .time').each(function(){
			var parts = this.id.split('_');
			parts.shift();							// the time_ prefix
			var time = parts.pop(); 		// last element is _time
			var nick = parts.join('_'); // in case name had _ in it
			// check if time doesn't exist in xml feed
			if ( ! $(doc).find( 
				'time[nick="'+nick+'"]', 
				'time[time='+time+']' 
				).length )
				$( this ).remove();
		});
	},
	'xml');
	// run again in one second
	window.setTimeout( times_update, 1000 );
}
times_update();
