
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
// display submission time on the page
function displaySubmissionTime(time) {
    var timeDisplay = document.getElementById('submissionTimeDisplay');
    if (timeDisplay) {
        timeDisplay.textContent = 'Form submitted successfully at ' + time;
    }
}
// Function called when the form is submitted
function submitForm() {
    var itemName = document.getElementById('inputName').value;
    var itemWeight = document.getElementById('inputWeight').value;
    var itemSize = document.getElementById('inputSize').value;
    var itemDestination = document.getElementById('inputDestination').value;
    var itemPickup = document.getElementById('inputpickup').value;
    var itemTips = document.getElementById('inputtips').value;
    var itemNotes = document.getElementById('inputnotes').value;
 // Validate form inputs
 if (!itemName || !itemWeight || !itemSize || !itemDestination || !itemPickup || !itemTips || !itemNotes) {
    toastr.error("Please fill in all fields.");
    return;
}
    // Get the current time
    var currentTime = new Date();
    // Format the time using toLocaleString to get the local date and time format
    var formattedTime = currentTime.toLocaleString();

    // Display the submission time on the page
    displaySubmissionTime(formattedTime);

    // Use FormData to capture form data including the file
    var formData = new FormData();
    var fileInput = document.getElementById('fileInput');
    var itemImageFile = fileInput.files[0];
    
    formData.append('itemImage', itemImageFile);
    formData.append('itemName', itemName);
    formData.append('itemWeight', itemWeight);
    formData.append('itemSize', itemSize);
    formData.append('itemDestination', itemDestination);
    formData.append('itemPickup', itemPickup);
    formData.append('itemTips', itemTips);
    formData.append('itemNotes', itemNotes);

    var token = localStorage.getItem('token');

    // Make an AJAX request to submit the form data to the server
    $.ajax({
        url: '/api/delivery/submitRequest',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        headers: {
            'authorization': `${token}` // Add the token to the headers
        },
        success: function (response) {
            toastr.success(response.message);
            // Reset the form after success
            resetImagePreview();

            document.getElementById('deliveryRequestForm').reset();
            // Handle any additional actions on success
        },
        error: function (error) {
            toastr.error("Failed to submit request.");
            console.error(error);
        }
    });
}
// Function to preview the selected image
function previewSelectedImage() {
    var fileInput = document.getElementById('fileInput');
    var previewImage = document.getElementById('previewImage');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        // Set the source of the preview image to the selected file
        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}
// Function to reset the image preview
function resetImagePreview() {
    var fileInput = document.getElementById('fileInput');
    var previewImage = document.getElementById('previewImage');

    // Reset the input file and image preview
    fileInput.value = null;
    previewImage.src = '';
}