// Piwik stats
var _paq = _paq || [];
_paq.push(["setDomains", ["*.endgeoblocking.eu","*.endgeoblocking.eu"]]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
	var u="//stats.juliareda.eu/";
	_paq.push(['setTrackerUrl', u+'piwik.php']);
	_paq.push(['setSiteId', 6]);
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();


window.onload = function() {
	window.screens = ['1b.jpg', '10.png', '19.png', '3.png', '4.png', '5.jpg', '17.jpg', '6.jpg', '7.jpg', '18.jpg', '8.jpg', '9.png', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '20.jpg'];
	window.currentScreen = 0;
	setTimeout(changeImage, 4000);

	window.onscroll = function() {
		//console.log(document.body.scrollTop);
		if (document.body.scrollTop > 100) {
			addClass('state-menu')
		} else {
			removeClass('state-menu')
		}
	}
}

function changeImage() {
	var preload = new Image();
	preload.onload = function() {
		window.currentScreen++;
		if (currentScreen == screens.length) currentScreen = 0;
		document.getElementById('noise').style.opacity = 1;
		setTimeout(function() {
			document.getElementById('screen').style.backgroundImage = 'url('+preload.src+')';
			document.getElementById('noise').style.opacity = .1;
			setTimeout(changeImage, 3000);
		}, 800);
	}
	var next = (currentScreen+1 == screens.length) ? 0 : currentScreen+1;
	preload.src = 'img/screens/'+screens[next];
}

function signup() {
	document.getElementById('agree').style.opacity = 0;
	document.getElementById('signup').style.height = '450px';
	var target = cumulativeOffset(document.getElementById('topbox')).top;
	var c=0;
	for (var i=document.body.scrollTop; i<target; i=i+3) {
		c++;
		//console.log(i, c*10, window.scrollY, target);
		(function() {
			var thisi = i;
			setTimeout(function() {
				window.scrollTo(0,thisi);
			}, c*(1+c/25));
		})();
	}
	document.getElementById('email').focus();
}

// helpers

function cumulativeOffset(element) {
	var top = 0, left = 0;
	do {
	    top += element.offsetTop  || 0;
	    left += element.offsetLeft || 0;
	    element = element.offsetParent;
	} while(element);
	return {
	    top: top,
	    left: left
	};
};
function addClass(c) {
	if (document.body.className.indexOf(c) == -1) document.body.className += ' '+c;
}
function removeClass(c) {
	//console.log(document.body.className.match(' ?'+c+' ?'))
	document.body.className = document.body.className.replace(c, '');
}
