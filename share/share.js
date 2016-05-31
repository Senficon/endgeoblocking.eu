function parseQuery(qstr) {
    var query = {};
    var a = qstr.substr(1).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}
var q = parseQuery(document.location.search);
var lang = (q.lang) ? ((q.lang == 'en') ? '' : q.lang) : '';

// if arrived here via a share, redirect to campaign page
if (parent == window) document.location.replace('http://endgeoblocking.eu/'+lang);

document.addEventListener("DOMContentLoaded", function() {
	var t = document.getElementById('tw');
	t.href = t.href.replace('***', encodeURIComponent(document.location.href));
	var f = document.getElementById('fb');
	f.href = f.href.replace('***', encodeURIComponent(document.location.href));
}, false);
