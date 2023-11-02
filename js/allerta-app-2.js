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
                stato.innerHTML += '<span class="badge badge-danger"><i class="ri-alert-line"></i>Allerta in corso</span>';
            }

});
