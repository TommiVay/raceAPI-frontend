function onLoad() {
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:3003/api/vehicles'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var vehicles = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < vehicles.length; i++) {
                out += parseVehicle(vehicles[i])
            }
            document.getElementById("vehiclesDiv").innerHTML = out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseVehicle(vehicle) {
    let outputHTMLStructure = ''
    outputHTMLStructure = '</div><div class="dropdown"> <a href=/api/cars/' + vehicle.name + ' class=dropbtn>' +
    vehicle.name + '</a><div class="dropdown-content"><h3>Class: </h3><p>' + vehicle.class + '</p><br><h3>Driver: </h3><a href=/api/drivers/' + vehicle.driver.name + '>' + vehicle.driver.name + '</a>'
    
    if (vehicle.description !== '') {
        outputHTMLStructure += '<h3>Description: </h3><p>' + vehicle.description + '</p>'
    }
    outputHTMLStructure += '</div></div>'
    
    return outputHTMLStructure
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
            document.getElementById('selectDriver').innerHTML += out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function addCars(form) {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    var body = { }
    body.driver = form.driver.value
    body.class = form.class.value
    body.name = form.name.value
    body.description = form.description.value
    const token = JSON.parse(loggedUserJSON).token
    var xmlhttp = new XMLHttpRequest();
    console.log(JSON.stringify(body))
    var url = 'http://localhost:3003/api/vehicles'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 201) {

            console.log(xmlhttp.responseText)
        }else {
            console.log(xmlhttp.responseText)
        }
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + token);

    xmlhttp.send(JSON.stringify(body));
}
