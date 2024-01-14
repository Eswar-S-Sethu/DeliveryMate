const form = document.querySelector("#userinfo");

async function sendData() {
    let data = {
        "username": $("#username").val(),
        "email": $("#email").val(),
        "password": $("#password").val()
    }
    $.ajax({
        url: '/api/user/register',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: (result) => {
            if (result.statusCode === 200) {
                $("#userinfo").trigger("reset");
                alert("User registered Succesfully")
            }
        }
    });
}

// Take over form submission
form.addEventListener("submit", (event) => {

    event.preventDefault();
    sendData();
});
