const url = 'http://localhost:3003/api/login'

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

const handleLogin = () => {
    const xmlhttp = new XMLHttpRequest()
    const username = document.getElementById("usernameField").value
    const password = document.getElementById("passwordField").value
    try {
        const credentials = {
            username, password
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                const user = JSON.parse(xmlhttp.responseText)
                console.log(user)
                localStorage.setItem("loggedUser", JSON.stringify(user))
            }
        }
        xmlhttp.open("POST", url, true)
        xmlhttp.setRequestHeader('Content-type', 'application/json')
        xmlhttp.send(JSON.stringify(credentials))

    } catch (exception) {
        console.log(exception)
    }

}





