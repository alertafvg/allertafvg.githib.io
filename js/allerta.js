var allerta = document.getElementById("allerta");


var settings = {
  "url": "https://allerta.binco.me/proxy.php",
  "method": "GET"
};
        $.ajax(settings).done(function (data) {
            for (let i = 0; i < 4; i++){
                if (data[i].level >= 1) {
                    var ok = 1;
                    break;
                }
            }
            if (ok >= 1) {
            allerta.innerHTML += '<div class="alert alert-danger" role="alert"> <h4 class="alert-heading">' + data[0].title + '</h4> <p>' + data[0].description + '</p> <hr>  <a class="btn btn-primary" href="' + data[0].link_url + '" target="_blank" role="button">Allerta</a> <a class="btn btn-secondary" href="' + data[0].file_url + '" target="_blank" role="button">Bollettino PDF</a></div>';
            } else {
             allerta.innerHTML += '    <div class="alert alert-success" role="alert"><h4 class="alert-heading">NESSUNA ALLERTA IN CORSO</h4><p>Attiva le notifiche per restare aggiornato.</p><hr> <a class="btn btn-primary text-white" role="button" href="#notifiche">Attiva le notifiche</a></div>';   
            }

});
