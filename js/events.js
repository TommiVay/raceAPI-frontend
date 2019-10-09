function onLoad() {

    var xmlhttp1 = new XMLHttpRequest();
    let url = 'http://localhost:3003/api/sessions'
    xmlhttp1.onreadystatechange = function () {
        if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
            var sessions = JSON.parse(xmlhttp1.responseText);
            var out = "";
            var i;
            console.log(sessions)
            for (i = 0; i < sessions.length; i++) {
                out += parseSession(sessions[i])
            }
            document.getElementById("sessionDiv").innerHTML = out;
        }
    }

    xmlhttp1.open("GET", url, true);
    xmlhttp1.send();
}

function parseSession(session) {
    const url = "http://localhost:3003/api"
    let outputHTMLStructure = ''
    track = session.track
    outputHTMLStructure = '</div>' + '<div class="dropdown">' + `<a href=${url}/sessions?name=${session.name} class=dropbtn>` +
        session.name + '</a>' + '<div class="dropdown-content">' + '<h3>' + 'Track:' + '</h3>' + `<a href=${url}/tracks?id=${track.id}>` + track.name + '</a>' + '</p>'

    if (session.drivers.length !== 0) {
        outputHTMLStructure += '<h3>' + 'Drivers:' + '</h3>'
        session.drivers.forEach(d => {
            outputHTMLStructure += ` <a href=${url}/drivers?username=${d.username}>` + d.name + '</a><br>'
        })
    }

    if (session.vehicles.length !== 0) {
        outputHTMLStructure += '<h3>Cars: </h3>'
        session.vehicles.forEach(c => {
            outputHTMLStructure += `<a href=${url}/vehicles?id=${c.id}>` + c.name + '</a><br>'
        })
    }

    outputHTMLStructure += '</div>' + '</div>'
    return outputHTMLStructure
}

function getVehicles() {
    var xmlhttp = new XMLHttpRequest();
    let url = 'http://localhost:3003/api/vehicles'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var vehicles = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < vehicles.length; i++) {
                out += "<option value=" + vehicles[i].name + ">" + vehicles[i].name + "</option>"
            }
            document.getElementById('selectVehicle').innerHTML += out;
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getDrivers() {
    var xmlhttp = new XMLHttpRequest();

    let url = 'http://localhost:3003/api/drivers'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var drivers = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < drivers.length; i++) {

                out += "<option value=" + drivers[i].name + ">" + drivers[i].name + "</option>"
            }
            console.log('autot')
            document.getElementById('selectDriver').innerHTML += out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getTracks() {

    var xmlhttp = new XMLHttpRequest();
    let url = 'http://localhost:3003/api/tracks'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var tracks = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < tracks.length; i++) {
                out += "<option value=" + tracks[i].name + ">" + tracks[i].name + "</option>"
            }
            document.getElementById('selectTrack').innerHTML += out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function addEvent() {

}