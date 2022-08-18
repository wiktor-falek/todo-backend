const formElement = document.querySelector("form");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(formElement.action, {
        method: "post",
        body: new URLSearchParams(new FormData(formElement))
    })
    .then(res => res.json())
    .then(res => {
        if (!res.success) {
            return alert(JSON.stringify(res));
        }
        alert(JSON.stringify(res.data));
    })
})