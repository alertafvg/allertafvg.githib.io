// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoiYmluY28iLCJhIjoiY2o1NTN5dTNiMDJtdzMydGdybHh4cmFhMyJ9.SDvCSaNQC6xpSTqsJN1mCQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/outdoors-v11',
center: [13.1, 46.1],
zoom: 7
});
 
map.on('load', function () {
    
    map.loadImage(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAAEeElEQVRYCe1WQWhcRRj+5zWbCoINgo0aKkrqGkzE7NoK9hRRU7xUPAgiehFBENuLnqSFglJ60It6KYIXPQgeRC9iq5hTBdPuppiEsKYolkbbgkShULPpjt83O/97s++9Xd9uCiI4MPvPfP8/3//t/+bNG5H/23+sAmYQvdMT9u6oJRVrpCoWXaTieepipGas1FqR1BdWzM/98vclqDph99uWvIkkewsmmjeRHKmtmK8KxuP/FGh7J+3tmxtyAtEHCoRnQ6x8MTQsL88vmd+yzk7kHwVVdtv7JZJTWHZnsPSqFTnJRwNb3zYkNfqub0oVhO5Rws4CujlYs9Zqyey5VbMUYJlhT0GuMk05g1VjfmUL9sNmUw4v/mQuZdgCYOoeO1oqyVuAXkSPvOviUEn29KpUD0E2mi7L1wh41JP9CftsvWG+9PNCplK2TyLwE/RbuAAV/XahIY+LGP65TFPlGUe1LK8EYjZtJE/1K4akXMO1GG5yTk5yc5zX4M+2yUl763BTzsMz4rxWjtR/NCx/R0Pc8E1/yRQS7qED//nMte2yuLRkNjoCMancaw9DDd9QtvWNkowj7vf2NPnNrdD2phxCSFuMyPKOMTmeLGmPKvfZAxC9ivPmLB7DCXaOidGXjvccyx4f8TnSYfFmix3PiN0G8pcUwOF3dG7OuHIrhn97CJvhc8x3KRbYXfS5mAAkB7kUYg7m0rnaTIXO73aHnr5Vl0fukM80mNYdA0beDrBLIP+YHVjy5iHGxQaBnuuyh8Z8riAieR0TMJJHdIIkJ9PVMUbegL/kY05jL9y10DAvsHMM/LT3lXysn4q4KoEzBoJcimUqhHdxXJ0gXNSxWpSdB55r2MSvhRuYY2LqD2MVCznDXOrPCAKQnK4t+UMDA3ubjsdXZV7HalNYHKt+CTg7cvmAjCCovhovjmRHPE4GV3SYtwdSWByra/AaxZwduXxARhAAnj+uWStTOlaL71e8B3D+vMOzSH0cE9N5GKtYyBnmUn9GEEr6nTpxas7OzNghndOC8BhM02P7cO78Ml22H7FzDHyf9zV9rJ+KkIucMRDkUiwjyO+BNR+wc/1XeVqDaeurZhnnzOsBNookz7MDG41xxLjYGMDx3Oba6aG11H5zcEbQp2Kug/wD5UHZj6arhM/Iu/gM8Pt0QeMCe4E+FxOArjrgUog5mEvnaoFn27/5LcsVRInVsn0VB+N7Xi6/9k/gjjzn530Z3MFncD6dwiK3H5H0YK1h3s8j6SoI2zd9H1rHa7r/XMN8n0fUDXuwbB/GvuCd2n2s8ScHuw/xMoEb33MguuiTjZCYCbolT+NpMeRqc6JeXVpmU4dxvGpGkfDGpwdcYVE5Yq6Qq9f1lbl7PLJE2kMT9gFc0L8Bop+Cno+vi5jHzq6YHxLW/FEhQVxaVNRWxDBPYUFFRG1VTN+CeomiL3ybMOWeKfSYuFZbXxXSRXmPz/v0Hj6QGHIMJIgLc0QRZhtYDBcPLIiLc0RtScyWBaVEySB7hhw3vLFS7DeC+G9MPcjyT0BJvwAAAABJRU5ErkJggg==',
            // Add an image to use as a custom marker
            function (error, image) {
                if (error) throw error;
                map.addImage('custom-marker', image);

                map.addSource('places', {
                    'type': 'geojson',
                    'data': 'https://allerta.binco.me/map/'
                });

                // Add a layer showing the places.
                map.addLayer({
                    'id': 'places',
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'icon-image': 'custom-marker',
                        'icon-allow-overlap': true
                    }
                });
            }
        );
    
            // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            className: 'card card-teaser rounded shadow row'
        });

        map.on('mouseenter', 'places', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.testo;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

});