// Reference to the card container
var cardContainer = document.getElementById("cardContainer");

// Fetch the user token from localStorage
var userToken = localStorage.getItem('token');

// Fetch all delivery requests from the API with token in headers
fetch('/api/delivery/getAllRequests', {
    method: 'GET',
    headers: {
        'Authorization':  userToken,
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        // Loop through the fetched data and generate cards
        data.requests.forEach(function (request) {
            // Create card element
            var cardElement = document.createElement("div");
            cardElement.classList.add("col-md-3");
            cardElement.innerHTML = `
                <div class="card h-100">
                    <img src="http://localhost:3000/${request.itemImage}" alt="request" class="image">
                    <div class="card-body">
                        <ul style="list-style-type:none; text-align:left; padding: 0;">
                            <li><strong>Item Name:</strong>${request.itemName}</li>
                            <li><strong>Weight:</strong>${request.itemWeight}</li>
                            <li><strong>Size:</strong>${request.itemSize}</li>
                            <li><strong>Destination:</strong>${request.itemDestination}</li>
                            <li><strong>Pick-Up Point:</strong>${request.itemPickup}</li>
                            <li><strong>Tips:</strong>${request.itemTips}</li>
                            <li><strong>Notes:</strong>${request.itemNotes}</li>
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
    })
    .catch(error => {
        console.error('Error fetching delivery requests:', error);
    });
