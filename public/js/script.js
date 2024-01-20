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

const form = document.querySelector("#logininfo");

async function sendData() {
    let data = {
        "username": $("#username").val(),
        "password": $("#password").val()
    }
    $.ajax({
        url: '/api/user/login',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: (result) => {
            if (result.statusCode === 200) {
                $("#logininfo").trigger("reset");
                alert("Logged in Succesfully")
                window.location.replace("http://localhost:3000/home/");
            }
        }
    });
}

// Take over form submission
form.addEventListener("submit", (event) => {
debugger
    event.preventDefault();
    sendData();
});




//create requests page~~~~~~~~~~~~~~~~~~~~~~~~~~~
function uploadImage() {
    var fileInput = document.getElementById('fileInput');
    var selectedFile = fileInput.files[0];
    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageContainer = document.querySelector('.card-body[style="min-height: 200px;"]');
            var imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.width = '100%'; 
            imgElement.style.height = '100%'; 
            imgElement.style.objectFit = 'cover'; 

            imageContainer.innerHTML = '';
            imageContainer.appendChild(imgElement);
        };


        reader.readAsDataURL(selectedFile);
    }
}

function submit() {
    var itemName = document.getElementById('inputName').value;
    var itemWeight = document.getElementById('inputWeight').value;
    var itemSize = document.getElementById('inputSize').value;
    var itemDestination = document.getElementById('inputDestination').value;
    var itemPickup = document.getElementById('inputpickup').value;
    var itemTips = document.getElementById('inputtips').value;
    var itemNotes = document.getElementById('inputnotes').value;

    alert('Request submitted successfully!');
}

//create requests page end~~~~~~~~~~~~~~~~~~~~~~~~~