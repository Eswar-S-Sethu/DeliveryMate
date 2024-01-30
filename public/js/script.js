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
                // alert("Logged in Succesfully")
                toastr.success("Logged in Successfully");
                window.location.replace("http://localhost:3000/home/");
            }
        },
        error: (error) => {
            console.error("Error in AJAX request:", error);
            toastr.error(error.responseJSON['error']);
        }
    });
}

// Take over form submission
form.addEventListener("submit", (event) => {
debugger
    event.preventDefault();
    sendData();
});




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~create requests page~~~~~~~~~~~~~~~~~~~~~~~~~~~
function uploadImage() {
    var fileInput = document.getElementById('fileInput');
    var selectedFile = fileInput.files[0];  // Get the selected file by the user
    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function (e) {  // Callback function executed when the file reading is completed
            var imageContainer = document.querySelector('.card-body[style="min-height: 200px;"]');
            var imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.width = '100%'; 
            imgElement.style.height = '100%'; 
            imgElement.style.objectFit = 'cover'; 

            imageContainer.innerHTML = '';
            imageContainer.appendChild(imgElement);
        };

// Read the file data in Data URL format
        reader.readAsDataURL(selectedFile);
    }
}


// Function called when the form is submitted
function submit() {
    var itemName = document.getElementById('inputName').value;
    var itemWeight = document.getElementById('inputWeight').value;
    var itemSize = document.getElementById('inputSize').value;
    var itemDestination = document.getElementById('inputDestination').value;
    var itemPickup = document.getElementById('inputpickup').value;
    var itemTips = document.getElementById('inputtips').value;
    var itemNotes = document.getElementById('inputnotes').value;

    // Get the current time
    var currentTime = new Date();
    // Format the time using toLocaleString to get the local date and time format
    var formattedTime = currentTime.toLocaleString();  

    // Display the submission time on the page
    displaySubmissionTime(formattedTime);

    // pop
    alert('Request submitted successfully!');
}

// display submission time on the page
function displaySubmissionTime(time) {
    var timeDisplay = document.getElementById('submissionTimeDisplay');
    if (timeDisplay) {
        timeDisplay.textContent = 'Form submitted successfully at ' + time;
    }
}

//create requests page end~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~requestboard.html~~~~~~~~~~~~~~~~~~~~~~~~~

// Reference to the card container
var cardContainer = document.getElementById("cardContainer");

// Loop through the cardsData array and generate cards
cardsData.forEach(function (cardData) {
    // Create card element
    var cardElement = document.createElement("div");
    cardElement.classList.add("col-md-3");
    cardElement.innerHTML = `
                <div class="card h-100">
                    <img src="${cardData.imgSrc}" alt="request" class="image">
                    <div class="card-body">
                        <ul style="list-style-type:none; text-align:left; padding: 0;">
                            <li><strong>Item Name:</strong>${cardData.itemName}</li>
                            <li><strong>Weight:</strong>${cardData.weight}</li>
                            <li><strong>Size:</strong>${cardData.size}</li>
                            <li><strong>Destination:</strong>${cardData.destination}</li>
                            <li><strong>Pick-Up Point:</strong>${cardData.pickUpPoint}</li>
                            <li><strong>Tips:</strong>${cardData.tips}</li>
                            <li><strong>Notes:</strong>${cardData.notes}</li>
                        </ul>
                    </div>
                  
                    <div class="d-flex justify-content-center align-items-center">
                        <button type="submit" class="btn">Accept request</button>
                    </div>
                </div>
          
            `;
    // Append card to the card container
    cardContainer.appendChild(cardElement);
});

//requestboard.html end~~~~~~~~~~~~~~~~~~~~~~~~~



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~reate requests page~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function uploadImage() {
    //eventual completion or failure of an asynchronous operation and its resulting value.
    return new Promise((resolve, reject) => {  
        var fileInput = document.getElementById('fileInput');
        var selectedFile = fileInput.files[0];  // Get the selected file by the user

        // Check if a file is selected
        if (selectedFile) {
            var reader = new FileReader();
            reader.onload = function (e) {  // Callback function executed when the file reading is completed
                var imageContainer = document.querySelector('.card-body[style="min-height: 200px;"]');
                var imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.style.width = '100%';
                imgElement.style.height = '100%';
                imgElement.style.objectFit = 'cover';

                imageContainer.innerHTML = '';
                imageContainer.appendChild(imgElement);

                resolve(true);  // Resolve the Promise, indicating successful upload
            };

            // Read the file data in Data URL format
            reader.readAsDataURL(selectedFile);
        } else {
            // If no file is selected, send feedback to the user
            alert('Please select an image before uploading.');
            reject(false);  // Reject the Promise, indicating upload failure
        }
    });
}

// Function called when the form is submitted
async function submit() {
    try {
        // Call uploadImage and check if the image was successfully uploaded
        await uploadImage();

        var itemName = document.getElementById('inputName').value;
        var itemWeight = document.getElementById('inputWeight').value;
        var itemSize = document.getElementById('inputSize').value;
        var itemDestination = document.getElementById('inputDestination').value;
        var itemPickup = document.getElementById('inputpickup').value;
        var itemTips = document.getElementById('inputtips').value;
        var itemNotes = document.getElementById('inputnotes').value;


        // get current time
        var currentTime = new Date();
        // Format the time using toLocaleString to get the local date and time format
        var formattedTime = currentTime.toLocaleString();

        // Display the submission time on the page
        displaySubmissionTime(formattedTime);

        // 弹出提示
        alert('Request submitted successfully!');
        return false;  
    } catch (error) {
        console.error(error);
        return false;  // Prevent default form submission
    }
}

// Display submission time on the page
function displaySubmissionTime(time) {
    var timeDisplay = document.getElementById('submissionTimeDisplay');
    if (timeDisplay) {
        timeDisplay.textContent = 'Form submitted successfully at ' + time;
    }
}
// create requests page end~~~~~~~~~~~~~~~~~~~~~~~~~

