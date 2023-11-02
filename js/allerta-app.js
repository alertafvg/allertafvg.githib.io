setInterval(function() {
    var currentTime = new Date ( );    
    var currentHours = currentTime.getHours ( );   
    var currentMinutes = currentTime.getMinutes ( );   
    var currentDay = "";
    var currentDate = currentTime.getDate ( );
    var currentMonth = currentTime.getMonth ( );
    var currentYear = currentTime.getFullYear ( );
    switch (currentTime.getDay ( )) { 
    case 0:
    currentDay = "Domenica";
    break;
  case 1:
    currentDay = "Lunedì";
    break;
  case 2:
    currentDay = "Martedì";
    break;
  case 3:
    currentDay = "Mercoledì";
    break;
  case 4:
    currentDay = "Giovedì";
    break;
  case 5:
    currentDay = "Venerdì";
    break;
  case  6:
    currentDay = "Sabato";
}
    currentDate = ( currentDate < 10 ? "0" : "" ) + currentDate; 
    currentMonth = ( currentMonth < 10 ? "0" : "" ) + currentMonth; 
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;   
    var currentTimeString = currentDay + " " + currentDate + "/" + currentMonth + "/" + currentYear + " " + currentHours + ":" + currentMinutes;
    document.getElementById("timer").innerHTML = '<i class="ri-time-line"></i> ' + currentTimeString;
}, 1000);










var allerta = document.getElementById("allerta");
var stato = document.getElementById("status");

            

var settings = {
  "url": "https://allerta.binco.me",
  "method": "GET"
};
        $.ajax(settings).done(function (data) {
            for (let i = 0; i < 3; i++){
                if (data[i].level >= 1) {
                    var ok = 1;
                    break;
                }
            }
            var date = new Date(data[0].dt_start)
var day = "0" + date.getDate();
var month = date.getMonth() + 1;
month = "0" + month;
var year = date.getFullYear();
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var icon = "#ri-heavy-showers-line";
        if (data[0].level == 0){ var color = "green"}
        else if  (data[0].level == 1){ var color = "yellow"}
        else if  (data[0].level == 2){ var color = "orange"}
        else if  (data[0].level == 2){ var color = "red"};
            
            if (ok >= 1) {
            allerta.innerHTML += '<div class="card card-teaser rounded shadow" style="border-left: 8px solid '+ color +';"> <div class="container text-center"> <span class="badge badge-secondary"> ' + day.substr(-2) + '/' + month.substr(-2) + '<br> ' + year + '<br> <hr style="margin: 2px;border-color: white !important;"> ' +  hours  + ':' + minutes.substr(-2) + ' </span> <hr class="text-center" style="border-color: blue !important;"> <svg class="icon text-center" style="color: ' + color +'";> <use xlink:href="/svg/remixicon.symbol.svg' + icon + '"></use> </svg> </div><div class="card-body"> <h5 class="card-title">' + data[0].title +' </h5> <div class="card-text"><p>' + data[0].description + '</p> </div><a class="btn btn-primary float-right" href="' + data[0].file_url + '" target="_blank" role="button" style="padding: 0px 7px;font-size: 13px; ">Dettagli ></a></div></div>';  
                stato.innerHTML += '<span class="badge badge-danger"><i class="ri-alert-line"></i>Allerta in corso</span>';
            } else {
            allerta.innerHTML += '    <div class="alert alert-success" role="alert"><h4 class="alert-heading">NESSUNA ALLERTA IN CORSO</h4><p>Attiva le notifiche per restare aggiornato.</p><hr> <a class="btn btn-primary text-white" role="button" href="#notifiche">Attiva le notifiche</a></div>';   
            }

});





   //     <div class="card card-teaser rounded shadow" style="border-left: 8px solid #d9364f;"> <div class="icon"> <span class="badge badge-secondary"> ' date.substr(-2) + ':' + month.substr(-2) + '<br> ' + year + '<br> <hr style="margin: 2px;border-color: white !important;"> ' + ' hours + ':' + minutes.substr(-2) + ' </span> <hr class="text-center" style="border-color: blue !important;"> <svg class="icon text-center"> <use xlink:href="/svg/remixicon.symbol.svg#' + icon + '"></use> </svg> </div><div class="card-body"> <h5 class="card-title">' + data[0].title +' </h5> <div class="card-text"><p>' + data[0].description + '</p> </div><a class="btn btn-primary float-right" href="' + data[0].file_url + '" target="_blank" role="button" style="padding: 0px 7px;font-size: 13px; ">Dettagli ></a></div></div>