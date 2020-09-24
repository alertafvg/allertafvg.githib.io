var mappa = document.getElementById("mappa");


var settings = {
  "url": "https://allerta.binco.me",
  "method": "GET"
};
        $.ajax(settings).done(function (data) {
            mappa.innerHTML += '<img src="https://www.meteo.fvg.it/mappa_zone_allerta.php?cont&dim=300&z=' + data[0].level +',' +  data[1].level +',' + data[2].level +',' + data[3].level + '">';

});

