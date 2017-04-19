window.defaultLang = 'en';

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

document.addEventListener("DOMContentLoaded", function() {
	// if going to main domain: try to auto detect language
	var langOs = document.getElementById('langselect').options;
	if (document.location.pathname == '/' &&
		!document.cookie.match('lang='+window.defaultLang)) {
		var browserLang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
		browserLang = browserLang.substr(0,2);
		if (browserLang != window.defaultLang) { // don't need to do anything there
			for (var i=0; i<langOs.length; i++) {
				if (langOs[i].value == browserLang) { // if it exists in the language dropdown
					document.location.replace('/'+browserLang);
				}
			}
		}
	}

	if (document.body.className.match(/lang-([a-z]{2})/)) {
		window.currLang = document.body.className.match(/lang-([a-z]{2})/)[1];
	} else {
		window.currLang = 'en';
	}
	for (var i=0; i<langOs.length; i++) {
		if (langOs[i].value == window.currLang) {
			langOs[i].selected = 'selected';
		}
	}

	window.screens = ['1b.jpg', '10.png', '19.png', '3.png', '4.png', '5.jpg', '17.jpg', '6.jpg', '7.jpg', '18.jpg', '8.jpg', '9.png', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '20.jpg', '22.jpg'];
	window.currentScreen = 0;
	setTimeout(changeImage, 4000);

	window.onscroll = function() {
		//console.log(document.body.scrollTop, window.scrollY);
		if (window.scrollY > 100) {
			addClass('state-menu')
		} else {
			removeClass('state-menu')
		}
	}

	// "don't call now, email instead" button
	//var d = new Date();
	//window.showEmailState = false;
	//if (d.getUTCDay() === 0 || // if Sunday
	//	d.getUTCDay() === 6 || // or Saturday
	//	d.getUTCHours() < 7 || // or before 9AM Brussels Summer Time
	//	d.getUTCHours() > 15 // or after 6PM Brussels Summer Time
	//	) {
	//	showEmail(); // then => show email!
	//}

	// countdown
	var targetDate = Date.parse("Apr 24, 2017 12:00 GMT+0100");
	var daysLeft = (targetDate-Date.parse(d))/(1000*60*60*24);
	var daysLeftDisplay = (daysLeft < 0) ? 0 : Math.round(daysLeft);
	document.getElementById('days').innerHTML = daysLeftDisplay;
	document.getElementById('countdown').style.opacity = 1;

}, false);

function switchLang(l) {
	if (l != window.currLang) {
		document.cookie = 'lang='+l+'; path=/';
		var url = document.location.pathname.replace('index.html', '');
		url += (window.currLang == window.defaultLang) ? '' : '../'; // default language lives in root
		url += (l == window.defaultLang) ? '' : l+'/';
		url += (document.location.protocol == 'file:') ? 'index.html' : ''; // for local dev
		document.location.replace(url);
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

function share(h) {
	var c = document.getElementById('cover');
	c.style.display = 'block';
	c.style.opacity	= 1;
	//document.getElementById('shareframe').src = h;
}

function shareHide() {
	var c = document.getElementById('cover');
	c.style.display = 'none';
	c.style.opacity	= 0;
}

function signup() {
	document.getElementById('agree').style.opacity = 0;
	document.getElementById('signup').style.height = '450px';
	var target = cumulativeOffset(document.getElementById('topbox')).top;
	var c=0;
	for (var i=window.scrollY; i<target; i=i+3) {
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



function geo(d, fromDropdown) {
	calliframe.src = 'https://endgeoblockingeu.herokuapp.com/?committee=IMCO&country='+d.country;
}

var meplist = [
	{name:"Vicky Ford", country:"UK", group:"ECR", party:"Conservatives", id:"?", photoid:"96949", email:"vicky.ford@europarl.europa.eu"},
	{name:"Anna Maria Corazza Bildt", country:"SE", group:"EPP", party:"Moderaterna", id:"?", photoid:"96674", email:"annamaria.corazzabildt@europarl.europa.eu"},

	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },
	{name:"", country:"", group: "", party: "", id: "?", photoid: "", email: "" },


	{name: "Jean-Marie Cavada",country: "FR",group: "ALDE",party: "Nous Citoyens",id: "17057", photoid: "28206", email: "jean-marie.cavada@europarl.europa.eu"},
	{name: "Axel Voss",country: "DE",group: "EPP",party: "Christlich Demokratische Union Deutschlands",id: "16943", photoid: "96761", email: "axel.voss@europarl.europa.eu"},
	{name: "Mady Delvaux",country: "LU",group: "S&D",party: "Parti ouvrier socialiste luxembourgeois",id: "17056", photoid: "124776", email: "mady.delvaux-stehres@europarl.europa.eu"},
	{name: "Max Andersson",country: "SE",group: "Greens/EFA",party: "Miljöpartiet de gröna",id: "17280", photoid: "124994", email: "max.andersson@europarl.europa.eu"},
	{name: "Joëlle Bergeron",country: "FR",group: "EFDD",party: "Sans étiquette",id: "16807", photoid: "124740", email: "joelle.bergeron@europarl.europa.eu"},
	{name: "Marie-Christine Boutonnet",country: "FR",group: "NI",party: "Front national",id: "17279", photoid: "124753", email: "marie-christine.boutonnet@europarl.europa.eu"},
	{name: "Kostas Chrysogonos",country: "GR",group: "GUE/NGL",party: "SYRIZA",id: "16896", photoid: "125061", weight: 3, email: "kostas.chrysogonos@europarl.europa.eu"},
	{name: "Therese Comodini Cachia",country: "MT",group: "EPP",party: "Partit Nazzjonalista",id: "17125", photoid: "124968", weight: 10, email: "therese.comodinicachia@europarl.europa.eu"},
	//{name: "Andrzej Duda",country: "PL",group: "ECR",party: "Prawo i Sprawiedliwość",id: "17276", photoid: "124899"},
	{name: "Rosa Estaràs Ferragut",country: "ES",group: "EPP",party: "Partido Popular",id: "16862", photoid: "96811", email: "rosa.estaras@europarl.europa.eu"},
	{name: "Laura Ferrara",country: "IT",group: "EFDD",party: "Movimento 5 Stelle",id: "16935", photoid: "124833", email: "laura.ferrara@europarl.europa.eu"},
	{name: "Enrico Gasbarra",country: "IT",group: "S&D",party: "Partito Democratico",id: "18983", photoid: "124817", email: "enrico.gasbarra@europarl.europa.eu"},
	{name: "Mary Honeyball",country: "UK",group: "S&D",party: "Labour Party",id: "17002", photoid: "5846", weight: 2, email: "mary.honeyball@europarl.europa.eu"},
	{name: "Sajjad Karim",country: "UK",group: "ECR",party: "Conservative Party",id: "16853", photoid: "28481", email: "sajjad.karim@europarl.europa.eu"},
	{name: "Dietmar Köster",country: "DE",group: "S&D",party: "Sozialdemokratische Partei Deutschlands",id: "17277", photoid: "124822", email: "dietmar.koester@europarl.europa.eu"},
	{name: "Gilles Lebreton",country: "FR",group: "NI",party: "Front national/Rassemblement Bleu Marine",id: "17282", photoid: "124738", email: "gilles.lebreton@europarl.europa.eu"},
	{name: "António Marinho e Pinto",country: "PT",group: "ALDE",party: "Independente",id: "16934", photoid: "124742", email: "antonio.marinhoepinto@europarl.europa.eu"},
	{name: "Jiří Maštálka",country: "CZ",group: "GUE/NGL",party: "Komunistická strana Čech a Moravy",id: "17085", photoid: "23704", weight: 2, email: "jiri.mastalka@europarl.europa.eu"},
	{name: "Ignazio Corrao",country: "IT",group: "EFDD",party: "Movimento 5 Stelle",id: "16742", photoid: "124856", email: "ignazio.corrao@europarl.europa.eu"},
	{name: "Sergio Gaetano Cofferati",country: "IT",group: "S&D",party: "Partito Democratico",id: "17047", photoid: "96915", email: "sergio.cofferati@europarl.europa.eu"},
	{name: "Fabio Massimo Castaldo",country: "IT",group: "EFDD",party: "Movimento 5 Stelle",id: "16872", photoid: "124812", email: "fabiomassimo.castaldo@europarl.europa.eu"},
	{name: "Daniel Buda",country: "RO",group: "EPP",party: "Partidul Naţional Liberal",id: "17187", photoid: "125012", email: "daniel.buda@europarl.europa.eu"},
	{name: "Mario Borghezio",country: "IT",group: "NI",party: "Lega Nord",id: "17329", photoid: "21817", email: "mario.borghezio@europarl.europa.eu"},
	{name: "Tadeusz Zwiefka",country: "PL",group: "EPP",party: "Platforma Obywatelska",id: "17278", photoid: "28301", email: "tadeusz.zwiefka@europarl.europa.eu"},
	{name: "József Szájer",country: "HU",group: "EPP",party: "Fidesz-Magyar Polgári Szövetség-Keresztény Demokrata Néppárt",id: "16801", photoid: "23821", email: "jozsef.szajer@europarl.europa.eu"},
	{name: "Evelyn Regner",country: "AT",group: "S&D",party: "Sozialdemokratische Partei Österreichs",id: "16919", photoid: "96998", email: "evelyn.regner@europarl.europa.eu"},
//	{name: "Julia Reda",country: "DE",group: "Greens/EFA",party: "Piratenpartei Deutschland",id: "16776", photoid: "124816"},
	{name: "Emil Radev",country: "BG",group: "EPP",party: "Граждани за европейско развитие на България",id: "17281", photoid: "124850", email: "emil.radev@europarl.europa.eu"},
	{name: "Victor Negrescu",country: "RO",group: "S&D",party: "Partidul Social Democrat",id: "17183", photoid: "88882", email: "victor.negrescu@europarl.europa.eu"},
	{name: "Constance Le Grip",country: "FR",group: "EPP",party: "Union pour un Mouvement Populaire",id: "17170", photoid: "101580", email: "constance.legrip@europarl.europa.eu"},
	{name: "Sylvia-Yvonne Kaufmann",country: "DE",group: "S&D",party: "Sozialdemokratische Partei Deutschlands",id: "17175", photoid: "1849", email: "sylvia-yvonne.kaufmann@europarl.europa.eu"},
	{name: "Heidi Hautala",country: "FI",group: "Greens/EFA",party: "Vihreä liitto",id: "16740", photoid: "2054", email: "heidi.hautala@europarl.europa.eu"},
	{name: "Jytte Guteland",country: "SE",group: "S&D",party: "Arbetarepartiet – Socialdemokraterna",id: "17216", photoid: "124991", email: "jytte.guteland@europarl.europa.eu"},
	{name: "Luis de Grandes Pascual",country: "ES",group: "EPP",party: "Partido Popular",id: "16842", photoid: "28393", email: "luis.degrandespascual@europarl.europa.eu"},
	{name: "Evelyne Gebhardt",country: "DE",group: "S&D",party: "Sozialdemokratische Partei Deutschlands",id: "17193", photoid: "1913", email: "evelyne.gebhardt@europarl.europa.eu"},
	{name: "Angel Dzhambazki",country: "BG",group: "ECR",party: "VMRO",id: "17040", photoid: "124873", weight: 2, email: "angel.dzhambazki@europarl.europa.eu"},
	{name: "Pascal Durand",country: "FR",group: "Greens/EFA",party: "Europe Écologie",id: "16990", photoid: "124693", email: "pascal.durand@europarl.europa.eu"},
	{name: "Brian Crowley",country: "IE",group: "ECR",party: "Fianna Fáil Party",id: "16909", photoid: "2109", email: "brian.crowley@europarl.europa.eu"},
	{name: "Stanisław Żółtek",country: "PL",group: "NI",party: "Kongres Nowej Prawicy",id: "17422", photoid: "124902", email: "stanislawjozef.zoltek@europarl.europa.eu"},
	{name: "Cecilia Wikström",country: "SE",group: "ALDE",party: "Folkpartiet liberalerna",id: "16772", photoid: "96677", weight: 3, email: "cecilia.wikstrom@europarl.europa.eu"},
	{name: "Rainer Wieland",country: "DE",group: "EPP",party: "Christlich Demokratische Union Deutschlands",id: "16729", photoid: "2323", email: "rainer.wieland@europarl.europa.eu"},
	{name: "Viktor Uspaskich",country: "LT",group: "ALDE",party: "Darbo partija",id: "17262", photoid: "96698", email: "viktor.uspaskich@europarl.europa.eu"},
	{name: "Giovanni Toti",country: "IT",group: "EPP",party: "Forza Italia",id: "17391", photoid: "124764", email: "giovanni.toti@europarl.europa.eu"},
	{name: "Virginie Rozière",country: "FR",group: "S&D",party: "Parti radical de gauche",id: "17194", photoid: "103845", email: "virginie.roziere@europarl.europa.eu"},
	{name: "Angelika Niebler",country: "DE",group: "EPP",party: "Christlich-Soziale Union in Bayern e.V.",id: "17004", photoid: "4289", email: "angelika.niebler@europarl.europa.eu"}
];

function showMEP(fromButton) {
	var validCountryCodes = ['AT', 'BG', 'CZ', 'FI', 'FR', 'DE', 'HU', 'IE', 'IT', 'LT', 'LU', 'MT', 'PL', 'PT', 'RO', 'ES', 'SE', 'UK'];

    document.getElementById('thankyou').style.display = 'none';
    document.getElementById('showmepcontainer').style.display = 'block';
    if (window.showEmailState === true) {
	    document.getElementById('callinput').style.display = 'none';
	} else {
		document.getElementById('callinput').style.display = 'block';
	}

    var randomOrNot = Math.floor(Math.random() * 2);
    if (!fromButton && randomOrNot == 0) { // on page load, 50% of the case show special prioritised MEPs
    	var currWeight = -1;
    	for (var i=0;i<meplist.length;i++) {
    		if ((validCountryCodes.indexOf(window.countryCode) == -1 || // this MEP fits country selection
    				meplist[i].country == window.countryCode)) {
    			var weight = meplist[i].weight || 0;
    			if (weight > currWeight) { // select the one with the highest weight value (if any)
    				var mep = meplist[i];
    				currWeight = weight;
    			}
    		}
    	}
    } else {
		var randomMep = Math.floor(Math.random() * meplist.length);
		if (window.countryCode && validCountryCodes.indexOf(window.countryCode) > -1) {
			while ( meplist[randomMep].country !== window.countryCode || // wrong country?
					meplist[randomMep].id == window.lastShownMEP &&		 // same as last?
					mepsFromCertainCountry(window.countryCode) !== 1) {	 // AND more than one MEP from the selected country
				randomMep = Math.floor(Math.random() * meplist.length);  // => find another
			}
		}
		var mep = meplist[randomMep];
	}
	if(document.location.hash == '#debug') mep = {name: "Julia Reda",country: "DE",group: "Greens/EFA",party: "Piratenpartei Deutschland",id: "16776", photoid: "124816"};
	window.lastShownMEP = mep.id;

	document.getElementById('mep_name').innerHTML = mep.name;
	document.getElementById('mep_party').innerHTML = mep.party;
	document.getElementById('mep_group').innerHTML = mep.group;
	document.getElementById('mep_photo').setAttribute("src", "http://www.europarl.europa.eu/mepphoto/"+ mep.photoid +".jpg")
	document.getElementById('callform').setAttribute("action", "https://piphone.lqdn.fr/campaign/call2/rapport_reda/"+mep.id);
	document.getElementById('mailbutton').setAttribute("href", "mailto:"+mep.email);

	return false;
}

function ccChange(v) {
	var plh = (v === '') ? "+12 345 67 89" : "0123 456 789";
	document.getElementById('localnumber').setAttribute("placeholder", plh);
}

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

function showEmail() {
	document.getElementById('emailmep').setAttribute("style", "display:inline;");
	document.getElementById('callinput').setAttribute("style", "display:none;");
	window.showEmailState = true;
}

function stats(mepid) {
	var i = document.createElement('img');
	var d = new Date();
	var timestamp = Date.now();
	var timeOffset = d.getTimezoneOffset();
	i.style.visibility = 'hidden';
	i.setAttribute('src', 'http://88.198.91.228/copywrongs.php?timestamp='+timestamp+'&mepid='+mepid+'&timeoffset='+timeOffset);
	document.body.appendChild(i);
}

function callSubmit() {
	var cc = document.getElementById('countrycode').value;
	var pn = document.getElementById('localnumber').value;
	if(document.location.hash == '#debug') { cc = '+32'; pn = '24857732'; }
	var validatedNumber = validateNumber(cc, pn);
	if (validatedNumber) {
	    document.getElementById('phone').value = validatedNumber;
	    stats(window.lastShownMEP);

	    document.getElementById('thankyou').style.display = 'block';
    	document.getElementById('showmepcontainer').style.display = 'none';
	    document.getElementById('callinput').style.display = 'none';
	} else {
		alert("Invalid number!")
	    event.preventDefault();
		return false;
	}
};

function validateNumber(c,n) {
	var countrycode = c;
	if (countrycode === "") {
		if(!/^[\+]/g.test(n)) {
			console.error("number doesn't start with + / number has to start with +[countrycode][rest without starting 0]");
			return false;
		}
		countrycode = "+";
	} else {
		if(/^[0]/g.test(n)) {
			n = n.substr(1);
		}
	}
	// removes everything that is not a number
	n = n.replace(/[^0-9]/g, '');
	if (n.length < 5) {
		console.error("number too short");
		return false;
	}
	// adds the countrycode or +
	n = countrycode + n;
	// print final number to console
	//console.log(n);
	return n;
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
