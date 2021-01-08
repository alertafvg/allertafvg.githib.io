//usage ex: alert(dateToNiceString(new Date())); 
//returns this format: "Oct 23 2019 1:09pm"
function dateToNiceString(myDate) {
    return myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
}




// var table = document.getElementById("tabella");

//var map = document.getElementById("map");

//  <tr> <th scope="row">'.i.'</th>     <td>'. data.municipalities[i]name .'</td>     <td>'. data.municipalities[i]pop .'</td>      <td>'. data.municipalities[i]q .'</td>        <td>'. data.municipalities[i]p .'</td>       <td>'. data.municipalities[i]g .'</td><td>'. data.municipalities[i]d .'</td></tr>


//


var quarantena = [];
var positivi = [];
var guariti = [];
var deceduti = [];
var comuni = [];
var istat = [];
var aggiornamento = [];

$(document).ready(function() {
    Papa.parse("/data.csv", {
        download: true,
        header: true,
        fastMode: true,
        step: function(row) {
            //table.innerHTML += '<tr> <th scope="row">'+ row.data.ISTAT +'</th>     <td>'+ row.data.Comune+'</td>     <td>'+ row.data.Popolazione +'</td>      <td>'+ row.data.Positivi +'</td>        <td>'+ row.data.Quarantena +'</td>       <td>'+ row.data.Guariti +'</td><td>'+ row.data.Morti +'</td></tr>';
            quarantena.push(row.data.Quarantena);
            positivi.push(row.data.Positivi);
            guariti.push(row.data.Guariti);
            deceduti.push(row.data.Morti);
            comuni.push(row.data.Comune);
            istat.push(row.data.ISTAT);
            aggiornamento.push(row.data.Aggiornamento);
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
        colors: ["yellow", "green", "#f73e5a"]
    }
};

var chart1 = new ApexCharts(
    document.querySelector("#comuni"),
    options1
);

chart1.render();

function getColor(d) {
    return d > 500 ? "#0033BB" :
        d > 200 ? "#0054DC" :
        d > 100 ? "#0088E8" :
        d > 50 ? "#00B8F8" :
        d > 20 ? "#4CD8FC" :
        d > 10 ? "#8CE4FC" :
        d > 5 ? "#CCF0F0" :
        "#FFFFFF";
}

function aggiornacomune(i) {
    var k = istat.indexOf(i);
    chart1.updateOptions({
        series: [{
            name: aggiornamento[k],
            data: [positivi[k], guariti[k], deceduti[k]]
        }],
        xaxis: {
            categories: ["Positivi", "Guariti", "Deceduti"],
            labels: {
                show: true
            }
        },
        title: {
            text: "Dati " + comuni[k] + " aggiornati il " + aggiornamento[k]
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
    colors: ["#00cf86", "#0066CC", "yellow", "#ff9900", "#f73e5a"]
}

var chart = new ApexCharts(
    document.querySelector("#chart"),
    options
);

chart.render();


var url = "https://www.dati.friuliveneziagiulia.it/resource/e95s-vpj5.json";

$.getJSON(url, function(response) {
    var ricoverati_con_sintomi = [];
    var terapia_intensiva = [];
    var isolamento_domiciliare = [];
    var tamponi = [];
    var deceduti = [];
    var dimessi_guariti = [];
    var labels = [];
    for (let i = 0; i < response.length; i++) {
        ricoverati_con_sintomi.push(response[i].ricoverati_con_sintomi)
        terapia_intensiva.push(response[i].terapia_intensiva)
        isolamento_domiciliare.push(response[i].isolamento_domiciliare)
        tamponi.push(response[i].tamponi)
        deceduti.push(response[i].deceduti)
        dimessi_guariti.push(response[i].dimessi_guariti)
        labels.push(dateToNiceString(new Date(response[i].data)))
    };


    chart.updateSeries([{
            name: "Dimessi guariti",
            type: "area",
            data: dimessi_guariti
        }, {
            name: "Isolamento domiciliare",
            type: "area",
            data: isolamento_domiciliare
        }, {
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
        xaxis: {
            categories: labels
        }
    })
});

// vaccini

var options2 = {
    chart: {
        height: 500,
        type: "line",
        id: 'vaccinazioni',
        group: 'vaccini',
    },
    dataLabels: {
        enabled: true
    },
    series: [],
    title: {
        text: "Dati Vaccinazioni",
    },
    xaxis: {
        categories: []
    },
    noData: {
        text: "Caricamento..."
    },
    colors: ["#00cf86", "#0066CC", "#FFC0CB"]
}

var chart2 = new ApexCharts(
    document.querySelector("#vaccini"),
    options2
);

chart2.render();

var options3 = {
    chart: {
        height: 500,
        type: "line",
        id: 'categorie',
        group: 'vaccini',
    },
    dataLabels: {
        enabled: true
    },
    series: [],
    title: {
        text: "Dati Giornalieri Categorie",
    },
    xaxis: {
        categories: []
    },
    noData: {
        text: "Caricamento..."
    },
    colors: ["#f73e5a", "#ff9900", "#0bd9d2"]
}

var chart3 = new ApexCharts(
    document.querySelector("#categorie"),
    options3
);

chart3.render();

var options4 = {
    chart: {
        height: 500,
        type: "line"
    },
    dataLabels: {
        enabled: true
    },
    series: [],
    title: {
        text: "Dati Giornalieri Dosi Consegnate",
    },
    xaxis: {
        categories: []
    },
    noData: {
        text: "Caricamento..."
    },
    colors: ["#f73e5a", "#ff9900", "#0bd9d2"]
}

var chart4 = new ApexCharts(
    document.querySelector("#dosi"),
    options4
);

chart4.render();


// tab 1

var url = "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-summary-latest.json";

$.getJSON(url, function(response) {
    var totale = [];
    var sesso_maschile = [];
    var sesso_femminile = [];
    var labels = [];

    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].area == "FVG") {
            totale.push(response.data[i].totale)
            sesso_maschile.push(response.data[i].sesso_maschile)
            sesso_femminile.push(response.data[i].sesso_femminile)
            labels.push(dateToNiceString(new Date(response.data[i].data_somministrazione)))
        }
    };

    chart2.updateSeries([{
            type: "area",
            name: "Totale vaccinati",
            data: totale
        },
        {
            type: "column",
            name: "Sesso maschile",
            data: sesso_maschile
        },
        {
            type: "column",
            name: "Sesso femminile",
            data: sesso_femminile
        }
    ]);


    chart2.updateOptions({
        xaxis: {
            categories: labels
        }
    })
});

// Tab 2

var url = "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-summary-latest.json";

$.getJSON(url, function(response) {
    var categoria_ospiti_rsa = [];
    var categoria_operatori_sanitari_sociosanitari = [];
    var categoria_personale_non_sanitario = [];
    var labels = [];

    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].area == "FVG") {
            categoria_ospiti_rsa.push(response.data[i].categoria_ospiti_rsa)
            categoria_operatori_sanitari_sociosanitari.push(response.data[i].categoria_operatori_sanitari_sociosanitari)
            categoria_personale_non_sanitario.push(response.data[i].categoria_personale_non_sanitario)
            labels.push(dateToNiceString(new Date(response.data[i].data_somministrazione)))
        }
    };

    chart3.updateSeries([{
            type: "column",
            name: "Ospiti rsa",
            data: categoria_ospiti_rsa
        },
        {
            type: "column",
            name: "Operatori sanitari e sociosanitari",
            data: categoria_operatori_sanitari_sociosanitari
        },
        {
            type: "column",
            name: "Personale non sanitario",
            data: categoria_personale_non_sanitario
        }
    ]);


    chart3.updateOptions({
        xaxis: {
            categories: labels
        }
    })
});


// Tab 3

var url = "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/consegne-vaccini-latest.json";

$.getJSON(url, function(response) {
    var numero_dosi = [];
    var labels = [];

    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].area == "FVG") {
            numero_dosi.push(response.data[i].numero_dosi)
            labels.push(dateToNiceString(new Date(response.data[i].data_consegna)))
        }
    };

    chart4.updateSeries([{
        name: "Numero  Giornaliero Dosi",
        data: numero_dosi
    }]);


    chart4.updateOptions({
        xaxis: {
            categories: labels
        }
    })
});



// tab  4

var options5 = {
    chart: {
        height: 500,
        type: "donut",
    },
    dataLabels: {
        enabled: true
    },
    series: [],
    title: {
        text: "Dati Totali Dosi ",
    },
    xaxis: {
        categories: []
    },
    noData: {
        text: "Caricamento..."
    },
    colors: ["#00cf86", "#ff9900"]
}

var chart5 = new ApexCharts(
    document.querySelector("#percentuale"),
    options5
);

chart5.render();


var url = "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/vaccini-summary-latest.json";

$.getJSON(url, function(response) {
    var dati = [];
    var total = [];

    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].area == "FVG") {
            dati.push(response.data[i].dosi_somministrate)
            dati.push(response.data[i].dosi_consegnate - response.data[i].dosi_somministrate)
            total.push(response.data[i].dosi_consegnate)
            // return i;
            break;
        }
    };



    chart5.updateOptions({
        series: dati,
        labels: ['Dosi somministrate', 'Dosi disponibili'],
        subtitle: {
            text: "Aggiornato il " + dateToNiceString(new Date(response.data[5].ultimo_aggiornamento)),
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '30px',
                        },
                        value: {
                            fontSize: '20px',
                        },
                        total: {
                            show: true,
                            label: 'Totale',
                            formatter: function(w) {
                                return total
                            }
                        }
                    }
                }
            }
        }
    })
});