$(document).on("pagecontainershow", function (e, ui) {
	var page = ui.toPage[0].id;
	if( page == 'map-page' ) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(initialize);
		} else {
			documentgetElementById("nogeolocation").innerHTML = "Geolocation is not supported by this browser.";
		}
	}
}); 

function initialize(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var currentPosition = new google.maps.LatLng(lat, lon);
	var houseResultPosition = new google.maps.LatLng(51.4906350, -0.207074);

	var mapOptions = {
	zoom: 12,
	center: currentPosition,
	mapTypeControl: true,
	mapTypeControlOptions: {
	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	}

	var houseMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var currentPositionImage ='assets/images/curr-icon.png';
	var userPosition  = new google.maps.Marker({
	position: currentPosition,
	map: houseMap,
	icon: currentPositionImage,
	title: 'Current Location'
	});

	var houseMarkerImage = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=A|FF0000|000000';
	var housePosition = new google.maps.Marker({
	position: houseResultPosition,
	map: houseMap,
	icon: houseMarkerImage,
	title: 'House 1'
	});

	var houseInfo ='<div id="mapscroll">'+
	'<h4>House 1</h4>'+
	'<p>Great Located House</p>' +
	'</div>'; 

	var houseInfoWindow = new google.maps.InfoWindow({
	content: houseInfo
	});

	google.maps.event.addListener(housePosition, 'click', function() {
	houseInfoWindow.open(houseMap, housePosition);
	});
}

