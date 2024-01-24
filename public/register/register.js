
// lock navbar
$(document).scroll(function () {
    if ($(this).scrollTop() > 550) {
        $('header').addClass('scrolled');
    } else {
        $('header').removeClass('scrolled');
    }
});

//login and signup font effects
const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

const form = document.querySelector("#userinfo");

async function sendData() {
    let data = {
        "username": $("#username").val(),
        "email": $("#email").val(),
        "password": $("#password").val(),
        "lastname":$("#lastname").val(),
        "firstname":$("#firstname").val(),
        "phonenumber":$("#phonenumber").val()
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
                window.location.replace("http://localhost:3000/");
            }
        }
    });
}

// Take over form submission
form.addEventListener("submit", (event) => {

    event.preventDefault();
    sendData();
});
