function onLoad() {
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:3003/api/tracks'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var tracks = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < tracks.length; i++) {
                out += parseTrack(tracks[i])
            }
            document.getElementById("tracksDiv").innerHTML = out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseTrack(track) {
    let outputHTMLStructure = ''
    outputHTMLStructure = '</div>' + '<div class="dropdown">' + '<a href=/api/tracks/' + track.name + ' class=dropbtn>' +
        track.name + '</a>' + '<div class="dropdown-content">' + '<h3>Address: </h3><p>' + track.address +'</p>'

    if (track.sessions.length !==0 ){
        outputHTMLStructure += '<br><h3>Events:</h3>'
        track.sessions.forEach(s => {
            outputHTMLStructure += '<a href=/api/sessions/' + s.name + '>' + s.name + '</a><br>'
        })
    }

    outputHTMLStructure += '</div>' + '</div>'
    return outputHTMLStructure
}