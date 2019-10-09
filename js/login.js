const url = 'http://localhost:3003/api/login'

const checkLogin = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const button = document.getElementById("loginButton")
    if (loggedUserJSON) {
        button.innerText = 'LOGOUT'
        button.onclick = function () { handleLogout() }
    } else {
        button.innerText = 'LOGIN'
        button.onclick = function () { openForm() }
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
                localStorage.setItem("loggedUser", JSON.stringify(user))
                closeForm()
                checkLogin()
            }
        }
        xmlhttp.open("POST", url, true)
        xmlhttp.setRequestHeader('Content-type', 'application/json')
        xmlhttp.send(JSON.stringify(credentials))

    } catch (exception) {
        console.log(exception)
    }

}

const handleLogout = () => {
    localStorage.clear()
    checkLogin()
}





