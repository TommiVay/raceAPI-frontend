function onLoad() {
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:3003/api/drivers'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var drivers = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < drivers.length; i++) {
                out += parseDriver(drivers[i])
            }
            document.getElementById("driversDiv").innerHTML = out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseDriver(driver) {
    const url = "http://localhost:3003/api"
    let outputHTMLStructure = ''
    outputHTMLStructure = '</div>' + `<div class="dropdown"> <a href=${url}/drivers?username=${driver.username}` + ' class=dropbtn>' +
        driver.name + '</a>' + '<div class="dropdown-content">' + '<h3>' + 'Username:' + '</h3>' + '<p>' + driver.username + '</p><br><h3>Nationality: </h3><p>' + driver.nationality + '</p><br><h3>Organization: </h3><p>' + driver.organization + '</p>'

    if (driver.vehicles.length !== 0) {
        outputHTMLStructure += '<br><h3>Vehicles: </h3>'
        driver.vehicles.forEach(v => {
            outputHTMLStructure += `<a href=${url}/vehicles?id=${v.id}>` + v.name + '</a><br>'
        })
    }

    if (driver.sessions.length !== 0) {
        outputHTMLStructure += '<h3>Sessions: </h3>'
        driver.sessions.forEach(s => {
            outputHTMLStructure += ` <a href=${url}/sessions?name=${s.name}>` + s.name + '</a><br>'
        })
    }


    outputHTMLStructure += '</div>' + '</div>'
    return outputHTMLStructure
}

function addDriver() {
    console.log('addDriver')

    var body = {}
    body.username = document.getElementById('usernameIP').value
    body.name = document.getElementById('realnameIP').value
    body.nationality = document.getElementById('nationalityIP').value
    body.organization = document.getElementById('organizationIP').value
    body.password = document.getElementById('passwordIP').value
    console.log(JSON.stringify(body))

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:3003/api/drivers'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText)
        } else {
            console.log(xmlhttp.responseText)
        }
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xmlhttp.send(JSON.stringify(body));
}
