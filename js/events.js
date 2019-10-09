function onLoad() {
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:3003/api/sessions'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var sessions = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < sessions.length; i++) {
                out += parseSession(sessions[i])
            }
            document.getElementById("sessionDiv").innerHTML = out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseSession(session) {
    let outputHTMLStructure = ''
    track = session.track
    outputHTMLStructure = '</div>' + '<div class="dropdown">' + '<a href=/api/sessions/' + session.name + ' class=dropbtn>' +
        session.name + '</a>' + '<div class="dropdown-content">' + '<h3>' + 'Track:' + '</h3>' + '<a href=/api/tracks/' + track.name + '>' + track.name + '</a>' + '</p>'

    if (session.drivers.length !== 0) {
        outputHTMLStructure += '<h3>' + 'Drivers:' + '</h3>'
        session.drivers.forEach(d => {
            outputHTMLStructure += ' <a href=/api/drivers/' + d.name + '>' + d.name + '</a><br>'
        })
    }


    if (session.vehicles.length !== 0) {
        outputHTMLStructure += '<h3>Cars: </h3>'
        session.vehicles.forEach(c => {
            outputHTMLStructure += '<a href=/api/cars/' + c.name + '>' + c.name + '</a><br>'
        })
    }

    outputHTMLStructure += '</div>' + '</div>'
    return outputHTMLStructure
}

function vehicles() {
    document.getElementById("myAddForm").style.display = "block"
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:3003/api/vehicles'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var vehicles = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < vehicles.length; i++) {
                out += "<option value=" + vehicles[i].name +">"+ vehicles[i].name + "</option>"
            }
            document.getElementById('selectVehicle').innerHTML += out;
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drivers() {
    document.getElementById("myAddForm").style.display = "block"
    var xmlhttp = new XMLHttpRequest();

    url = 'http://localhost:3003/api/drivers'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var drivers = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < drivers.length; i++) {

                out += "<option value=" + drivers[i].name +">"+ drivers[i].name + "</option>"
            }
            console.log('autot')
            document.getElementById('selectDriver').innerHTML += out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function openAddForm() {

    document.getElementById("myAddForm").style.display = "block"
    var xmlhttp = new XMLHttpRequest();
    drivers();
    vehicles();


    url = 'http://localhost:3003/api/tracks'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var tracks = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < tracks.length; i++) {
                out += "<option value=" + tracks[i].name +">"+ tracks[i].name + "</option>"
            }
            document.getElementById('selectTrack').innerHTML += out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}