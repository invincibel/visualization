var layers;
var array = ["crime","sex","literacy"];
			function highlightFeature(e){
				console.log(e);
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
						var html = '<b>'+t+'</b><div><p id="crime">Crime rate: 53</p></div>'
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
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'yellow',
						fillOpacity : 0.2
					}
				);
				
	}				
		function getStateCol(name,val)
		{
			var sel = array[val];
			if (window.XMLHttpRequest) {
            	xmlhttp = new XMLHttpRequest();
        } else {
            	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                	var key=this.responseText;
                	console.log(sel);
                	document.getElementById(""+sel+"").value=key;	
            }
        };
        xmlhttp.open("GET",sel+".php?q="+name,true);
        xmlhttp.send();
		}
		function getStateColor(name){
			
			
					if(name>82658)
						return 'red';
					else if(name<82658)
						return 'blue';
					else
						return 'green';
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
		
			setMap();
			document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';