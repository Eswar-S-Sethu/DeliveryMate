
let requestList=[];
const userToken = localStorage.getItem('token')
// Function to fetch all requests by the current user
async function getAllRequestsByCurrentUser() {
    try {
        const response = await fetch('/api/delivery/getAllRequestsByUser', {
            method: 'GET',
            headers: {
                'Authorization':  userToken,
                'Content-Type': 'application/json'
            }
        }); // Assuming this endpoint returns user details
        const allDeliveryRequestByUser = await response.json();
        console.log(allDeliveryRequestByUser)
        if (allDeliveryRequestByUser && allDeliveryRequestByUser.requests) {
            
                return allDeliveryRequestByUser.requests;
           
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

function createRequestCards() {
    const container = document.getElementById("requestContainer");

    requestList.forEach(request => {
        // Create card element
        const card = document.createElement("div");
        card.className = "card mb-3";

        // Create card content
        const cardContent = `
        <div class="row no-gutters">
            <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="${request.itemImage}" class="card-img" alt="Request Image ${request._id}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Request #${request._id}</h5>
                    <p class="card-text">Item Name: ${request.itemName}</p>
                    <p class="card-text">Weight: ${request.itemWeight}</p>
                    <p class="card-text">Size: ${request.itemSize}</p>
                    <p class="card-text">Destination: ${request.itemDestination.name}</p>
                    <p class="card-text">Pick-up: ${request.itemPickup.name}</p>
                    <p class="card-text">Notes: ${request.itemNotes}</p>
                    <p class="card-text">Tips: ${request.itemTips}</p>
                    <p class="card-text">Status: ${request.status}</p>
                    <div class="d-flex">
                        <button class="btn btn-success me-2" data-toggle="modal" data-target="#editModal${request._id}">Edit</button>
                        <button onclick="deleteRequest('${request._id}')" class="btn btn-danger">Delete</button>
                        <button onclick="goToChat('${request._id}')" class="btn btn-primary">Go to Chat</button>
                    </div>
                </div>
            </div>
        </div>
    `;

        card.innerHTML = cardContent;

        console.log("REQUEST ID:",request._id);

        // Append card to container
        container.appendChild(card);

        // Create corresponding edit modal
        createEditModal(request);
    });
}


// Function to create edit modal for each request
function createEditModal(request) {
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = `
        <div class="modal fade" id="editModal${request._id}" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Request #${request._id}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="editItemName">Item Name:</label>
                            <input type="text" id="editItemName${request._id}" class="form-control" value="${request.itemName}">
                        </div>
                        <div class="form-group">
                            <label for="editWeight">Weight:</label>
                            <input type="text" id="editWeight${request._id}" class="form-control" value="${request.itemWeight}">
                        </div>
                        <div class="form-group">
                            <label for="editSize">Size:</label>
                            <input type="text" id="editSize${request._id}" class="form-control" value="${request.itemSize}">
                        </div>
                        <div class="form-group">
                            <label for="editDestination">Destination:</label>
                            <input type="text" id="editDestination${request._id}" class="form-control" value="${request.itemDestination}">
                        </div>
                        <div class="form-group">
                            <label for="editPickup">Pick-up:</label>
                            <input type="text" id="editPickup${request._id}" class="form-control" value="${request.itemPickup}">
                        </div>
                        <div class="form-group">
                            <label for="editNotes">Notes:</label>
                            <textarea id="editNotes${request._id}" class="form-control" rows="4">${request.itemNotes}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="editTips">Tips:</label>
                            <input type="text" id="editTips${request._id}" class="form-control" value="${request.itemTips}">
                        </div>
                        <div class="form-group">
                            <label for="editImageUrl">Image URL:</label>
                            <input type="text" id="editImageUrl${request._id}" class="form-control" value="${request.itemImage}">
                        </div>
                        <button class="btn btn-primary" onclick="saveChanges(${request._id})">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalContainer);
}

function goToChat(thereqID){
    console.log("Request id:",thereqID);
    userName="Sender";
    // Assuming you have 'request' defined somewhere in your code
    window.location.href = `/chat?username=${userName}&room=${thereqID}`;
}


// Function to delete request (replace this with actual logic)
function deleteRequest(requestId) {
    alert(`Delete request with ID: ${requestId}`);
}

// Initialize the page
createRequestCards();
// Function to dynamically update the page with requests
async function updatePageWithUserRequests() {
    try {
        const userRequests = await getAllRequestsByCurrentUser();

        if (userRequests.length > 0) {
            // Update the requestList with user-specific requests
            requestList = userRequests;

            // Clear existing request cards
            const container = document.getElementById("requestContainer");
            container.innerHTML = '';

            // Create new cards based on user-specific requests
            createRequestCards();
        } else {
            createRequestCards();
            alert('No requests found for the current user.');


        }
    } catch (error) {
        console.error(error);
    }
}
function saveChanges(requestId) {
    deb
    const editItemName = document.getElementById(`editItemName${requestId}`).value;
    const editWeight = document.getElementById(`editWeight${requestId}`).value;
    const editSize = document.getElementById(`editSize${requestId}`).value;
    const editDestination = document.getElementById(`editDestination${requestId}`).value;
    const editPickup = document.getElementById(`editPickup${requestId}`).value;
    const editNotes = document.getElementById(`editNotes${requestId}`).value;
    const editTips = document.getElementById(`editTips${requestId}`).value;
    const editImageUrl = document.getElementById(`editImageUrl${requestId}`).value;

    const requestData = {
        id: requestId,
        itemName: editItemName,
        itemWeight: editWeight,
        itemSize: editSize,
        itemDestination: editDestination,
        itemPickup: editPickup,
        itemNotes: editNotes,
        itemTips: editTips,
        itemImage: editImageUrl,
    };
debugger
    fetch('/api/delivery/submitRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response from the server
        console.log(data);
        // You may want to update your UI or take additional actions here
        $(`#editModal${requestId}`).modal('hide');
        alert(`Changes saved successfully for request with ID: ${requestId}`);
    })
    .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors, e.g., display an error message to the user
    });
}
// Function to delete request
async function deleteRequest(requestId) {
    try {
        const response = await fetch(`/api/delivery/deleteRequest/${requestId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': userToken,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // Remove the deleted request from the requestList
        requestList = requestList.filter(request => request._id !== requestId);
        debugger
        toastr.success(`Request with ID ${requestId} deleted successfully.`);
        // Update the UI to reflect the changes
        updatePageWithUserRequests();

    } catch (error) {
        console.error('Fetch error:', error);
        // Handle errors, e.g., display an error message to the user
    }
}

// Initialize the page
updatePageWithUserRequests();

