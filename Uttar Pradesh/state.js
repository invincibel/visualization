var countriesLayer;
			
			function highlightFeature(e){
				//console.log(e);
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'white',
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
				
				/*console.log(la[0]);*/
				$.getJSON('https://nominatim.openstreetmap.org/reverse', {
    				lat: la,
    				lon: lo,
    				format: 'json',
				}, function (result) {
						//console.log(result);
						var t = result.address.state_district;	
						var len = disData.district.length;
				//console.log(len);
			for(var i=0;i<len;i++){
				if(disData.district[i].name==t)
				{
					var p = disData.district[i].population;
				}
			}
						var html = '<b>'+t+'</b><div><p id="population">Population: '+p+'</p><p id="crime"></p><p id="lit"></p></div>'
						layer.bindPopup(
						html,
							{minWidth : 256}
			);
						
				});
			}
			
			function resetHighlight(e){
				countriesLayer.resetStyle(e.target);
			}
			
			function zoomToFeature(e){
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
						//console.log(result);
						var t = result.address.state_district;	
						if (window.XMLHttpRequest) {
           				 xmlhttp = new XMLHttpRequest();
        			} else {
            			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        			}
        			xmlhttp.onreadystatechange = function() {
            		if (this.readyState == 4 && this.status == 200) {
                		var	tex3= this.responseText;
               			//console.log(typeof(tex3));
               			//console.log(tex3);
                		document.getElementById('crime').innerHTML="Crime Rate: "+tex3;
                		makeGraph(t,tex3);
                		}
        			};
        			xmlhttp.open("GET","main.php?q="+t,true);
        			xmlhttp.send();	
				});
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
			
			function getCountryColor(nam){
				var len = disData.district.length;
				//console.log(len);
			for(var i=0;i<len;i++){
				if(disData.district[i].name==nam)
				{
					var p = disData.district[i].population;
					//console.log(p);
					//var poi = p.replace(",","")
					//var po = poi.replace(",","")
					//var pop = parseInt(po);
					return getCol(p);
					}
				}
			return '#909090';	
				
			}
			function getCol(pop)
		{
			if(pop<10000)
					return '#909090';
				else if(pop<3210140.91549)
					return '#505050';
				else 
					return '#282828';
		}
			function countriesStyle(feature){
				//console.log(feature);
				return {
					fillColor : getCountryColor(feature.properties.Name),
					weight : 2,
					opacity : 1,
					color : 'white',
					dashArray : 3,
					fillOpacity : 0.7
				}
			}
			
			var map = L.map('map').setView([22.72, 72.7721], 17);
			countriesLayer = L.geoJson(
				countries,
				{
					style : countriesStyle,
					onEachFeature : countriesOnEachFeature
				}
			).addTo(map);
			map.fitBounds(countriesLayer.getBounds());
			
			var legend = L.control({position : 'bottomright'});
			legend.onAdd = function(map){
				var div = L.DomUtil.create('div', 'legend');
				var labels = [
					"Population greater than 10000", 
					"Population greater than 10000 and less than 3210140", 
					"Population greater than 3210140"
				];
				var grades = [1000, 100000, 50000000];
				div.innerHTML = '<div><b>Legend</b></div>';
				for(var i = 0; i < grades.length; i++){
					div.innerHTML += '<i style="background:' 
					+ getCol(grades[i]) + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
					+ labels[i] + '<br />';
				}
				return div;
			}
			legend.addTo(map);
			//code of ajax
//graph code begin here
function makeGraph(name,text)
{
	var c = text.split(",");
	var x1=parseInt(c[1]);
	var x2 = parseInt(c[2]);
	var x3 = parseInt(c[3]);
	var x4 = parseInt(c[6]);
	
var y1=1,y2=2,y3=3,y4=4;
 var chart = new CanvasJS.Chart("chartContainr",{
      title:{
      text: "crime graph of "+name
      },
       data: [
      {
        type: "line",

        dataPoints: [
       	{x: y1,y: x1},
		{x: y2,y: x2},
		{x: y3,y: x3},
		{x: y4,y: x4,indexLabel: "predicted value",markerColor: "red", markerType: "triangle"}
        ]
      }
      ]
    });

    chart.render();
}

if (window.XMLHttpRequest) {
           				 xmlhttp = new XMLHttpRequest();
        			} else {
            			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        			}
        			xmlhttp.onreadystatechange = function() {
            		if (this.readyState == 4 && this.status == 200) {
                		var	tex3= this.responseText;
               			//console.log(typeof(tex3));
               			//console.log(tex3);
                		makeSGraph("Uttar Pradesh",tex3);
                		}
        			};
        			xmlhttp.open("GET","main.php?q=Uttar Pradesh",true);
        			xmlhttp.send();	
function makeSGraph(name,text){
	var c = text.split(",");
	var x1=parseInt(c[1]);
	var x2 = parseInt(c[2]);
	var x3 = parseInt(c[3]);
	var x4 = parseInt(c[6]);
	
var y1=1,y2=2,y3=3,y4=4;
 var chart = new CanvasJS.Chart("chartContainer",{
      title:{
      text: "crime graph of "+name
      },
       data: [
      {
        type: "line",

        dataPoints: [
       	{x: y1,y: x1},
		{x: y2,y: x2},
		{x: y3,y: x3},
		{x: y4,y: x4,indexLabel: "predicted value",markerColor: "red", markerType: "triangle"}
        ]
      }
      ]
    });

    chart.render();
}