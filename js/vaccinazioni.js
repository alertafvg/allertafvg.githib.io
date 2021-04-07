//usage ex: alert(dateToNiceString(new Date()));
//returns this format: "Oct 23 2019 1:09pm"
function dateToNiceString(myDate) {
    return myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
}

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
        text: "Dati Giornalieri Vaccinazioni",
    },
    xaxis: {
        categories: []
    },
    noData: {
        text: "Caricamento..."
    },
    colors: ["#00cf86", "#0066CC", "#FFC0CB","#0bd9d2","#3126ff"]
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
    colors: ["#f73e5a", "#ff9900", "#0bd9d2", "#3126ff"]
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


// Tab 1-2

var url = "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-summary-latest.json";

$.getJSON(url, function(response) {

    response.data.sort((a, b) => {
  return new Date(a.data_somministrazione) - new Date(b.data_somministrazione); // ordinamento vedi issue #70
})

    var totale = [];
    var sesso_maschile = [];
    var sesso_femminile = [];
    var prima_dose = [];
    var seconda_dose = [];
    var labels = [];
    //tab 2
    var categoria_ospiti_rsa = [];
    var categoria_operatori_sanitari_sociosanitari = [];
    var categoria_personale_non_sanitario = [];
    var categoria_over80 = [];
    var categoria_altro = [];
    var categoria_forze_armate = [];
    var categoria_personale_scolastico = [];


    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].area == "FVG") {
            totale.push(response.data[i].totale)
            sesso_maschile.push(response.data[i].sesso_maschile)
            sesso_femminile.push(response.data[i].sesso_femminile)
            prima_dose.push(response.data[i].prima_dose)
            seconda_dose.push(response.data[i].seconda_dose)
            labels.push(dateToNiceString(new Date(response.data[i].data_somministrazione)))
            //tab2
            categoria_ospiti_rsa.push(response.data[i].categoria_ospiti_rsa)
            categoria_operatori_sanitari_sociosanitari.push(response.data[i].categoria_operatori_sanitari_sociosanitari)
            categoria_personale_non_sanitario.push(response.data[i].categoria_personale_non_sanitario)
            categoria_over80.push(response.data[i].categoria_over80)
            categoria_altro.push(response.data[i].categoria_altro)
            categoria_forze_armate.push(response.data[i].categoria_forze_armate)
            categoria_personale_scolastico.push(response.data[i].categoria_personale_scolastico)
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
        },
        {
            type: "line",
            name: "Prima dose",
            data: prima_dose
        },
        {
            type: "line",
            name: "Seconda dose",
            data: seconda_dose
        }
    ]);


    chart2.updateOptions({
        xaxis: {
            categories: labels
        }
    })

    //tab 2
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
        },
        {
            type: "column",
            name: "Over 80",
            data: categoria_over80
        },
        {
            type: "column",
            name: "Altro",
            data: categoria_altro
        },
        {
            type: "column",
            name: "Forze Armate",
            data: categoria_forze_armate
        },
        {
            type: "column",
            name: "Personale Scolastico",
            data: categoria_personale_scolastico
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
    var fornitore = [];

    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].area == "FVG") {
            numero_dosi.push(response.data[i].numero_dosi)
            fornitore.push(response.data[i].fornitore)
            labels.push(dateToNiceString(new Date(response.data[i].data_consegna)))
        }
    };

    chart4.updateSeries([{
        name: "Numero  Giornaliero Dosi",
        data: numero_dosi,
        labels: fornitore
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
