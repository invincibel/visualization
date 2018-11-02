var layers;
			function highlightFeature(e){
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'silver',
						fillOpacity : 0.2
					}
				);
				if(!L.Browser.ie && !L.Browser.opera){
					layer.bringToFront();
				}
				var chk = e.latlng.toString();
				var pattern = /\d{2}.\d{4,}/;
				var res = chk.split(",");
				var la = pattern.exec(res[0])[0];
				var lo = pattern.exec(res[1])[0];
				$.getJSON('https://nominatim.openstreetmap.org/reverse', {
    				lat: la,
    				lon: lo,
    				format: 'json',
				}, function (result) {
						var t = result.address.state;	
						var html = '<b>'+t+'</b><div><p id="crime"></p><p id="sex"></p><p id="lit"></p></div>'
						layer.bindPopup(
						html,
							{minWidth : 256}
			);
				});
			}
			function resetHighlight(e){
				layers.resetStyle(e.target);
			}
			function zoomToFeature(e){
				var tex1,tex2,tex3;
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'yellow',
						fillOpacity : 0.2
					}
				);
				var la  = e.latlng.lat;
				var lo  = e.latlng.lng;
				$.getJSON('https://nominatim.openstreetmap.org/reverse', {
    				lat: la,
    				lon: lo,
    				format: 'json',
				}, function (result) {
						var t = result.address.state;	
			//sending request for crime
					if (window.XMLHttpRequest) {
           				 xmlhttp = new XMLHttpRequest();
        			} else {
            			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        			}
        			xmlhttp.onreadystatechange = function() {
            		if (this.readyState == 4 && this.status == 200) {
                		tex3= this.responseText;
               			//console.log(typeof(tex3));
                		document.getElementById('crime').innerHTML="Crime Rate: "+tex3;
                		makeGraph(t,tex3);        			}
        			};
        			xmlhttp.open("GET","crime.php?q="+t,true);
        			xmlhttp.send();	
			//starting ajax for second one

					if (window.XMLHttpRequest) {
            			xmlhtt = new XMLHttpRequest();
        			} else {
           				xmlhtt = new ActiveXObject("Microsoft.XMLHTTP");
        			}
        			xmlhtt.onreadystatechange = function() {
            		if (this.readyState == 4 && this.status == 200) {
                		 tex1= this.responseText;
                		//console.log(tex);
                		document.getElementById('sex').innerHTML="female per 1000 males:  "+tex1;
                		makeSgraph(t,tex1);
        			}
        		};
        			xmlhtt.open("GET","sex.php?q="+t,true);
        			xmlhtt.send();
			//starting ajax for third one
					if (window.XMLHttpRequest) {
            			xmlht = new XMLHttpRequest();
        			} else {
            			xmlht = new ActiveXObject("Microsoft.XMLHTTP");
        			}
        			xmlht.onreadystatechange = function() {
            		if (this.readyState == 4 && this.status == 200) {
                		 tex2= this.responseText;
                		//console.log(tex);
                		document.getElementById('lit').innerHTML=tex2;
                		makeEgraph(t,tex2);
        			}
        		};
        			xmlht.open("GET","literacy.php?q="+t,true);
        			xmlht.send();
        			//for making the graph function
        			//console.log(tex1);
        			//makeGraph(t);
    		});

}
		function getStateColor(nam){
			var len = stateData.states.length;
			for(var i=0;i<len;i++){
				if(stateData.states[i].name==nam)
				{
					var p = stateData.states[i].population;
					var poi = p.replace(",","")
					var po = poi.replace(",","")
					var pop = parseInt(po);
					return getCol(pop);
					}
				}
			return '#909090';	
		}
		function getCol(pop)
		{
			if(pop<10000000)
					return '#909090';
				else if(pop<100000000)
					return '#505050';
				else 
					return '#282828';
		}	
		function stateStyle(feature)
		{
			return{
				fillColor:getStateColor(feature.properties.NAME_1),
				weight:2,
				opacity:1,
				color:'white',
				dashArray:3,
				fillOpacity:0.7
			}
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
var map = L.map('map').setView([28.535517,77.391029],5);
	function setMap(){
		
		layers=L.geoJson(
			data,
			{
				style:stateStyle,
				onEachFeature : countriesOnEachFeature
			}
			).addTo(map);
	}
		var legend = L.control({position : 'bottomright'});
			legend.onAdd = function(map){
				var div = L.DomUtil.create('div', 'legend');
				var labels = [
					"Population less than 10000000", 
					"Population less than 100000000", 
					"Population greater than 100000000"
				];
				var grades = [1000000, 100000000, 1000000000];
				div.innerHTML = '<div><b>Legend</b></div>';
				for(var i = 0; i < grades.length; i++){
					div.innerHTML += '<i style="background:' 
					+ getCol(grades[i]) + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
					+ labels[i] + '<br />';
				}
				return div;
			}
			legend.addTo(map);
			setMap();
			document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

//making graph function goes from here
function makeGraph(name,value)
{
	var val = parseInt(value);
	var chart = new CanvasJS.Chart("chartContainer",{
		title:{
			text:"crime rate of "+name
		},
		data: [
		{
			type: "column",
			dataPoints : [{ y: val, label: name }],
		}]
	});
	chart.render();
}
function makeSgraph(name,value)
{
	var val = parseInt(value);
	var fp=((val)/(1000+val))*100;
	var bp=100.00-fp;
	var chart = new CanvasJS.Chart("chartContainr", {
	animationEnabled: true,
	title: {
		text: "Sex ratio of "+name
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##0.00\"%\"",
		indexLabel: "{label} {y}",
		dataPoints: [
			{y: fp, label: "female percentage"},
			{y: bp, label: "male percentage"}
		]
	}]
});
chart.render();
}
function makeEgraph(name,value)
{
	var pre = value.split("Female");
	var mlp = /\d{2}.\d{2}/;
	var ml = mlp.exec(pre[0]);
	var fl = mlp.exec(pre[1]);
	console.log(typeof(ml[0]));
	//console.log(fl[0]);
	var chart = new CanvasJS.Chart("chartContain",{
		title:{
			text:"Education rate of men and women of "+name
		},
		data: [{
			type: "column",
			//yValueFormatString: "##0.00",
			dataPoints : [
						{y: parseFloat(ml[0]),label: "male literacy"},
						{ y: parseFloat(fl[0]), label: "female literacy" }
			]
		}]
	});
	chart.render();

}
