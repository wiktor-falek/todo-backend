const loginFormId = "#auth-form--login"
const loginFormElement = document.querySelector(loginFormId);

loginFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(loginFormElement.action, {
        method: "post",
        body: new URLSearchParams(new FormData(loginFormElement))
    })
    .then(res =>  res.json().then(data => ({ ok: res.ok, body: data })))
    .then(res => {
        if (res.ok !== true) {
            let allErrorElements = document.querySelectorAll(`${loginFormId} label .error`);
            allErrorElements.forEach(el => {
                el.innerHTML = "";
            })
            let errorElement = document.querySelector(`${loginFormId} label[for=${res.body.param}] .error`);
            if (errorElement !== undefined && errorElement !== null) {
                errorElement.innerHTML = res.body.message || "";
            }
            return
        } 
        window.location.href = "http://www.google.com";
    })
})