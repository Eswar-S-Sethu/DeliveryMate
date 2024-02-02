document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display accepted requests
    fetchAcceptedRequests();
});

var userToken = localStorage.getItem('token');

async function fetchAcceptedRequests() {

    try {
        const response = await fetch('/api/accepetedRequest', {
            headers: {
                'Authorization': userToken,
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        console.log(responseData)
        if (responseData && responseData['acceptedRequests'].length > 0) {

            displayAcceptedRequests(responseData['acceptedRequests']);
        } else {
            displayNoAcceptedRequestsMessage();
        }
    } catch (error) {
        console.error('Error fetching accepted requests:', error);
    }
}

function displayAcceptedRequests(acceptedRequests) {
    const container = document.getElementById('acceptedRequestsContainer');

    // Clear the container before appending new data
    container.innerHTML = '';

    acceptedRequests.forEach(request => {
        const card = document.createElement('div');
        card.className = 'card mb-3';

        const cardContent = `
            <div class="card-body">
                <h5 class="card-title">Accepted Request #${request._id}</h5>
                <p class="card-text">Request ID: ${request.requestId}</p>
                <p class="card-text">Accepted By: ${request.acceptingUserId}</p>
                <p class="card-text">Timestamp: ${new Date(request.createdAt).toLocaleString()}</p>
                <button class="btn btn-danger" onclick="deleteAcceptedRequest('${request.requestId}')">Cancel Acceptance</button>
            </div>
        `;

        card.innerHTML = cardContent;
        container.appendChild(card);
    });
}


function displayNoAcceptedRequestsMessage() {
    const container = document.getElementById('acceptedRequestsContainer');
    container.innerHTML = '<p>No accepted requests available.</p>';
}

async function deleteAcceptedRequest(requestId) {
    // Confirm with the user before proceeding with the deletion
    const confirmation = confirm("Are you sure you want to cancel the acceptance?");
    
    if (!confirmation) {
        return;
    }

    // Send a DELETE request to the server
    fetch(`/api/accepetedRequest/${requestId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': userToken,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response from the server        
        toastr.success(data.message)
        // Refresh the page or update the UI as needed
        fetchAcceptedRequests();
    })
    .catch(error => {
        console.error('Fetch error:', error);
        toastr.error(error)
        // Handle errors, e.g., display an error message to the user
    });
}

