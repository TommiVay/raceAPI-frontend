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
    console.log(session)
    let cars = []
    let track = {}
    let drivers = []
    let outputHTMLStructure = ''
    console.log(session.vehicles)
    track = session.track
    console.log(session.drivers)
    outputHTMLStructure = '</div>' + '<div class="dropdown">' + '<a href=/api/sessions/' + session.name + ' class=dropbtn>' +
        session.name + '</a>' + '<div class="dropdown-content">' + '<h3>' + 'Track:' + '</h3>' + '<a href=/api/tracks/' + track.name + '>' + track.name + '</a>' + '</p>' + '<h3>' + 'Drivers:' + '</h3>';

    session.drivers.forEach(d => {
        outputHTMLStructure += ' <a href=/api/drivers/' + d.name + '>' + d.name + '</a>'
    })

    outputHTMLStructure += '<h3>Cars: </h3>'

    session.vehicles.forEach(c => {
        outputHTMLStructure += '<a href=/api/cars/' + c.name + '>' + c.name + '</a>'
    })

    outputHTMLStructure += '</div>' + '</div>'
    return outputHTMLStructure
}