function onLoad () {
    var xmlhttp = new XMLHttpRequest();
    var url = 'localhost:3003/sessions'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var sessions = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < sessions.length; i++) {
                out += parseSession(sessions[i])
            }
            document.getElementById("sessionList").innerHTML = out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseSession(session) {
    let outputHTMLStructure = ''
    let name = session.name
    let cars = session.vehicle.map(c => c.name)
    let track = session.track.name
    let drivers = session.drivers.map(d => d.name)

    outputHTMLStructure = '<div class="dropdown">' +
    + '<a href=/api/sessions/' + name + ' class="dropbtn">' + name + '</a>' +
    '<div class="dropdown-content">' + '<p>' + track + '</p>'
      drivers.forEach(d => {
          outputHTMLStructure.concat('<a href="/api/drivers/'+ d.name +'>' + d.name + '</a>')
      })
      cars.forEach(c => {
          outputHTMLStructure.concat('<a href="/api/cars/'+ c.name +'>' + c.name + '</a>')
      })
      outputHTMLStructure.concat('</div>' + '</div>')
}