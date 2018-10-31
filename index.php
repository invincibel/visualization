<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
<script src="data/data.geojson"></script>
<style>
#map{
	height: 400px;
}
</style>
</head>
<body>
	<h1>My Map</h1>
	<div id="map">		
	</div>
	<script>
		var map = L.map('map').setView([28.535517,77.391029],3.5);
		var layers=L.geoJson(data).addTo(map);
	</script>
</body>
</html>>