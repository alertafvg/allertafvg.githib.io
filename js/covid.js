

//usage ex: alert(dateToNiceString(new Date())); 
//returns this format: "Oct 23 2019 1:09pm"
function dateToNiceString(myDate){
  return myDate.getDate()+"/"+(myDate.getMonth()+1)+"/"+myDate.getFullYear();
}





var table = document.getElementById("tabella");

//var map = document.getElementById("map");

  //  <tr> <th scope="row">'.i.'</th>     <td>'. data.municipalities[i]name .'</td>     <td>'. data.municipalities[i]pop .'</td>      <td>'. data.municipalities[i]q .'</td>        <td>'. data.municipalities[i]p .'</td>       <td>'. data.municipalities[i]g .'</td><td>'. data.municipalities[i]d .'</td></tr>


//


var quarantena = [];
var positivi = [];
var guariti = [];
var deceduti = [];
var comuni = [];
var istat = [];

$(document).ready(function(){
Papa.parse("/data.csv", {
    download: true,
    header: true,
    fastMode: true,
	step: function(row) {
        table.innerHTML += '<tr> <th scope="row">'+ row.data.ISTAT +'</th>     <td>'+ row.data.Comune+'</td>     <td>'+ row.data.Popolazione +'</td>      <td>'+ row.data.Positivi +'</td>        <td>'+ row.data.Quarantena +'</td>       <td>'+ row.data.Guariti +'</td><td>'+ row.data.Morti +'</td></tr>';
        quarantena.push(row.data.Quarantena);
        positivi.push(row.data.Positivi);
        guariti.push(row.data.Guariti);
        deceduti.push(row.data.Morti);
        comuni.push(row.data.Comune);
        istat.push(row.data.ISTAT);
    },
    complete: function() {
    console.log("All done!");
    }
});
});




var options1 = {
  chart: {
      height: 500,
      type: "radar"
  },
  series: [],
  title: {
      text: "Dati Comune"
  },
  noData: {
    text: "Selezione il comune..."
  },
    dataLabels: {
  enabled: true,
  background: {
    enabled: true,
    borderRadius: 2
  }
},
    fill: {
      opacity: 0.5
},
    markers: {
        colors:["yellow", "green", "#f73e5a"]}
};

var chart1 = new ApexCharts(
  document.querySelector("#comuni"),
  options1
);

chart1.render();

function getColor(d) {
    return d > 500 ? "#0033BB" :
           d > 200  ? "#0054DC" :
           d > 100  ? "#0088E8" :
           d > 50  ? "#00B8F8" :
           d > 20   ? "#4CD8FC" :
           d > 10   ? "#8CE4FC" :
           d > 5   ? "#CCF0F0" :
                      "#FFFFFF";
}

function aggiornacomune(i) {
    var k = istat.indexOf(i);
        chart1.updateOptions({
        series:[
 {
    name: "Valore",
    data: [positivi[k], guariti[k],deceduti[k]]
        }            ],
        xaxis: {
  categories: ["Positivi", "Guariti", "Deceduti"],
            title: {
                text: "Dati Comune di " + comuni[k]
            },
  labels: {show: true}
        }
        })    
}


//Dati regionali

var options = {
  chart: {
      height: 500,
      type: "line",
  },
  dataLabels: {
      enabled: false
  },
  series: [],
  title: {
      text: "Dati Regionali Covid",
  },
  noData: {
    text: "Caricamento..."
  },
colors:["#00cf86","#0066CC", "yellow", "#ff9900", "#f73e5a"]
}

var chart = new ApexCharts(
  document.querySelector("#chart"),
  options
);

chart.render();


var url = "https://www.dati.friuliveneziagiulia.it/resource/e95s-vpj5.json";

$.getJSON(url, function(response) {
        var ricoverati_con_sintomi = [];
          for (let i = 0; i < response.length; i++){
            ricoverati_con_sintomi.push(response[i].ricoverati_con_sintomi)
            };
        var terapia_intensiva = [];
          for (let i = 0; i < response.length; i++){
            terapia_intensiva.push(response[i].terapia_intensiva)
            };
        var isolamento_domiciliare = [];
          for (let i = 0; i < response.length; i++){
            isolamento_domiciliare.push(response[i].isolamento_domiciliare)
            };
            var tamponi = [];
          for (let i = 0; i < response.length; i++){
            tamponi.push(response[i].tamponi)
            };
            var deceduti = [];
          for (let i = 0; i < response.length; i++){
            deceduti.push(response[i].deceduti)
            };
                var dimessi_guariti = [];
          for (let i = 0; i < response.length; i++){
            dimessi_guariti.push(response[i].dimessi_guariti)
            };
                var labels = [];
          for (let i = 0; i < response.length; i++){
            labels.push(dateToNiceString(new Date(response[i].data)))
            };


  chart.updateSeries([
 {
    name: "Dimessi guariti",
    type: "area",
    data: dimessi_guariti
  }, {
    name: "Isolamento domiciliare",
    type: "area",
    data: isolamento_domiciliare
  },{
    name: "Ricoverati con sintomi",
    data: ricoverati_con_sintomi
  },
{
    name: "Terapia intensiva",
    data: terapia_intensiva
  },
{
    name: "Totale deceduti",
    type: "area",
    data: deceduti
  }
])
    
    
    chart.updateOptions({
        xaxis:{
  categories: labels
}
})
});

