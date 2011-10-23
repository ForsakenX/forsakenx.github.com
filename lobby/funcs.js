function pad2(number) { return (number < 10 ? '0' : '') + number }
function get_date( t )
{
	t = new Date( parseInt(t)*1000 );
	var h = t.getHours();
	var p = h >= 12 ? "pm" : "am";
	h = h > 12 ? h-12 : h;
	var m = t.getMinutes();
	m = m > 0 ? ':'+pad2(m) : "";
	return ''+(t.getMonth()+1)+'-'+t.getDate()+' '+h+m+p;
}
