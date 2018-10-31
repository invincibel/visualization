<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
<script src="data/data.geojson"></script>
<style>
#map{
	height: 1000px;
	width: 600px;
	margin-top: -25em;
	margin-left: -5em;
	}
.leaflet-container{
    background-color:rgba(255,0,0,0.0);
}
.leaflet-control-zoom{
	display: none;
}
</style>
</head>
<body>
	<div id="map">		
	</div>
	<script>
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
		     var point = [22.75, 78.25];
			var myMarker = L.marker(point);
			myMarker.addTo(map);
			myMarker.bindPopup(
				'<b>Sarajevo</b><div><img style="width:100%" src="http://upload.wikimedia.org/wikipedia/commons/f/fc/Sarajevo.jpg" alt="image" /></div>',
				{minWidth : 256}
			);
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
	</script>
</body>
</html>