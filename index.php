<?php
 include 'connection.php';
?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
<script src="data/data.geojson"></script>
<link rel="stylesheet" href="css/index.css"/>
</head>
<body>
	<input type="number" id="test" value="" hidden="true">
	<div id="map"></div>
	<div class="custom-select" style="width:200px;">
  <select id="sel" onclick="setMap()">
    <option value="0">crime</option>
    <option value="1">education</option>
    <option value="2">literacy</option>
  </select>
</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	
	<script src="app.js"></script>
</body>
</html>