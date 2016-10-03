// Copyright 2016 Phaneendra Varma Maryala <pvmaryala@gmail.com>
// Distributed under the terms of the GNU General Public License v2.
// See http://www.gnu.org/licenses/gpl-2.0.txt for the full license text.

var months = ['January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'];

var timeformat = null;


function padTime(x) {
	if(x < 10) {
		return '0' + x;
	} else {
		return x;
	}
}
function getBackground() {
	$.ajax({
        url: 'http://quotes.rest/qod.json?api_key=uI4bQpfS4IWuAAq_trTEPQeF&category=management',
        cache: false,
        timeout: 5000,
        success: function(data) {
        	console.log('Response from the call',data);
            document.getElementById('quoteval').innerHTML = data.contents.quotes[0].quote;
            // document.body.style.backgroundImage = "url('data.contents.quotes[0].background')";
        	$("body").css("background-image", "url("+ data.contents.quotes[0].background + ")");
        	
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function updateTime() {
	var date = new Date();

	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	var dd = date.getDate();
	var dm = date.getMonth();
	var dy = date.getFullYear();

	if(timeformat == 12) {
		h = (h + 11) % 12 + 1;
	}

	var str_t = padTime(h) + '&nbsp;&nbsp;' + padTime(m) +
		'&nbsp;&nbsp' + padTime(s);
	var str_d = dd + ' ' + months[dm] + ' ' + dy;

	document.getElementById('timeval').innerHTML = str_t;
	document.getElementById('dateval').innerHTML = str_d;
}

function startTempo() {
	timeformat = localStorage['timeformat'];

	updateTime();

	getBackground();
	setTimeout(function() {updateTime(); setInterval(updateTime, 1000)},
		1000 - new Date().getTime() % 1000);
}

window.onload = startTempo;

document.addEventListener('contextmenu', function(e) {e.preventDefault()});