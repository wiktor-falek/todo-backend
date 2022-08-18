const registerFormId = "#auth-form--register"
const registerFormElement = document.querySelector("form");

registerFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(registerFormElement.action, {
        method: "post",
        body: new URLSearchParams(new FormData(registerFormElement))
    })
    .then(res =>  res.json().then(data => ({ ok: res.ok, body: data })))
    .then(res => {
        if (res.ok !== true) {
            let allErrorElements = document.querySelectorAll(`${registerFormId} label .error`);
            allErrorElements.forEach(el => {
                el.innerHTML = "";
            })
            let errorElement = document.querySelector(`${registerFormId} label[for=${res.body.param}] .error`);
            if (errorElement !== undefined && errorElement !== null) {
                errorElement.innerHTML = res.body.message || "";
            }
            return;
        }
        window.location.href = "/login";
    })
})