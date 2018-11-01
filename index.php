<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
<script src="data/data.geojson"></script>
<style type="text/css" rel="stylesheet" href="css/index.css"></style>
<style>
#map{
	position: fixed;
	height: 950px;
	width: 900px;
	left: -200px;
	top: -285px;
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
	<div id="map"></div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="app.js"></script>

</body>
</html>