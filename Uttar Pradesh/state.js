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
						console.log(result);
						var t = result.address.state_district;	
						var html = '<b>'+t+'</b><div><p id="crime"></p><p id="sex"></p><p id="lit"></p></div>'
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
				//console.log(e);
				//map.fitBounds(e.target.getBounds());
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
			
			function getCountryColor(popEst){
				//console.log(popEst);
				if(popEst > 100000000){
					return 'red';
				}else if(popEst > 50000000){
					return 'blue';
				}else{
					return 'green';
				}
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
			
			var map = L.map('map').setView([43.8476, 18.3564], 5);
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
					"Population greater than 100000000", 
					"Population greater than 50000000", 
					"Population equal or less than 50000000"
				];
				var grades = [100000001, 50000001, 50000000];
				div.innerHTML = '<div><b>Legend</b></div>';
				for(var i = 0; i < grades.length; i++){
					div.innerHTML += '<i style="background:' 
					+ getCountryColor(grades[i]) + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
					+ labels[i] + '<br />';
				}
				return div;
			}
			legend.addTo(map);
						document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';