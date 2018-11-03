<?php
 include 'connection.php';
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
<script src="data/data.geojson"></script>
<script src="data/stateData.js"></script>
<script src="data/up.geojson"></script>
<link rel="stylesheet" href="css/index.css"/>
</head>
<body>
	<div id="map"></div>
	<div>
	<div id="chartContainer" style="height: 33%;position: absolute;right:500px" contentEditable="true" data-text="select a state to see the data"></div>
	<div id="chartContainr" style="height: 33%;position: absolute;right:500px;top:35%;"></div>
	<div id="chartContain" style="height: 33%;position: absolute;right:500px;top:65%;"></div>
</div>
<form action="decide.php" method="get" id="form">
	<input type="radio" value="" id="state" name="state"><h3 id="header"></h3>
	<input type="submit" name="submit" value="See more">
</form>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
	<script src="app.js"></script>
</body>
</html>