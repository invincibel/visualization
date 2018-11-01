function getState(la,lo)
{$.getJSON('https://nominatim.openstreetmap.org/reverse', {
    lat: la,
    lon: lo,
    format: 'json',
}, function (result) {
	console.log(result);
    var t = JSON.parse(result);
    console.log(t.address);
});
}
var layers;

			function highlightFeature(e){
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'yellow',
						fillOpacity : 0.2
					}
				);
				if(!L.Browser.ie && !L.Browser.opera){
					layer.bringToFront();
				}
			}
			
			function resetHighlight(e){
				layers.resetStyle(e.target);
			}
			
			function zoomToFeature(e){
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'yellow',
						fillOpacity : 0.2
					}
				);
				var chk = e.latlng.toString();
				var pattern = /\d{2}.\d{4,}/;
				var res = chk.split(",");
				var lat = pattern.exec(res[0])[0];
				var lon = pattern.exec(res[1])[0];
				console.log(lat);
				console.log(lon);
				getState(lat,lon);

				layer.bindPopup(
				'<b>'+'state'+'</b><div>ratio:54</div>',
				{minWidth : 256}
			);
		    /* var point = [22.75, 78.25];
			var myMarker = L.marker(point);
			myMarker.addTo(map);
			myMarker.bindPopup(
				'<b>Sarajevo</b><div><img style="width:100%" src="http://upload.wikimedia.org/wikipedia/commons/f/fc/Sarajevo.jpg" alt="image" /></div>',
				{minWidth : 256}
			);*/
			}
			
			function countriesOnEachFeature(feature, layer){
				layer.on(
					{
						mouseover : highlightFeature,
						mouseout : resetHighlight,
						click : zoomToFeature
					}
				);
			}
			
			
		function getStateColor(pop)
		{
			if(pop>100000)
				return 'red';
			else if(pop>500000)
				return 'blue';
			else
				return 'green';
		}
		function stateStyle(feature)
		{
			return{
				fillColor:getStateColor(feature.properties.pop_est),
				weight:2,
				opacity:1,
				color:'white',
				dashArray:3,
				fillOpacity:0.7
			}
		}
		var map = L.map('map').setView([28.535517,77.391029],5);
		layers=L.geoJson(
			data,
			{
				style:stateStyle,
				onEachFeature : countriesOnEachFeature
			}
			).addTo(map);
		//map.fitBounds(layers.getBounds());
		//var legend = L.control({position : 'bottomright'});
		/*	legend.onAdd = function(map){
				var div = L.DomUtil.create('div', 'legend');
				var labels = [
					"Population greater than 100000000", 
					"Population greater than 50000000", 
					"Population equal or less than 50000000"
				];
				var grades = [100000001, 50000001, 50000000];
				div.innerHTML = '<div><b>Legend</b></div>';
				for(var i = 0; i < grades.length; i++){
					div.innerHTML += '<i style="background:' 
					+ getStateColor(grades[i]) + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
					+ labels[i] + '<br />';
				}
				return div;
			}
			legend.addTo(map);*/
			document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';