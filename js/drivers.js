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
    let outputHTMLStructure = ''
    outputHTMLStructure = '</div>' + '<div class="dropdown"> <a href=/api/drivers/' + driver.name + ' class=dropbtn>' +
    driver.name + '</a>' + '<div class="dropdown-content">' + '<h3>' + 'Username:' + '</h3>' + '<p>' + driver.username + '</p><br><h3>Nationality: </h3><p>' + driver.nationality + '</p><br><h3>Organization: </h3><p>' + driver.organization + '</p>'
    
    if (driver.vehicles.length !== 0) {
        outputHTMLStructure += '<br><h3>Vehicles: </h3>' 
        driver.vehicles.forEach(v => {
            outputHTMLStructure += '<a href=/api/vehicles/' + v.name + '>' + v.name + '</a><br>'
        })
    }

    if (driver.sessions.length !== 0) {
        outputHTMLStructure += '<h3>Sessions: </h3>'
        driver.sessions.forEach(s => {
            outputHTMLStructure += ' <a href=/api/sessions/' + s.name + '>' + s.name + '</a><br>'
        })
    }


    outputHTMLStructure += '</div>' + '</div>'
    return outputHTMLStructure
}