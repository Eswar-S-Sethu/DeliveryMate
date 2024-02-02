document.addEventListener("DOMContentLoaded", function () {
    let inp = document.getElementById("inp");  // Input element
    let message = document.getElementById("message");  // Message container
    let main = document.querySelector(".main");  // Main container
    let sendButton = document.querySelector(".send");  // Send button
    let lastMessageTime = null;  // Variable to store the last sent message time

    // Listen for 'Enter' key press in the input field
    document.onkeydown = function (event) {
        if (event.key == "Enter") {
            sendMessage();
        }
    }
    // Listen for 'click' event on the send button
    sendButton.onclick = function () {
        sendMessage();
    };

    // Function to handle sending a message
    function sendMessage() {
        let val = inp.value;
        let currentTime = getCurrentTime();

        // Check if the current message is from a different time
        if (currentTime !== lastMessageTime) {
            // Display the time for the new message
            let timeNode = document.createElement("p");
            timeNode.classList.add("time");
            timeNode.textContent = currentTime;
            timeNode.style.textAlign = "center";

            let messageNode = document.createElement("li");
            messageNode.appendChild(timeNode);

            lastMessageTime = currentTime;
            message.appendChild(messageNode);
        }

        // Display the text of the message
        let textNode = document.createElement("span");
        textNode.textContent = val;
        textNode.classList.add("text-right");

        let messageNode = document.createElement("li");
        messageNode.classList.add("text-right");
        messageNode.appendChild(textNode);

        message.appendChild(messageNode);
        inp.value = "";

        // Scroll to the bottom of the container
        main.scrollTop = main.scrollHeight - main.clientHeight;
    }

    function getCurrentTime() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0:00)
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let currentTime = `${hours}:${minutes}${ampm}`;
        return currentTime;
    }
});


//this part with click dunction
// document.addEventListener("DOMContentLoaded", function () {
//     let inp = document.getElementById("inp");
//     let message = document.getElementById("message");
//     let main = document.querySelector(".main");
//     let lastMessageTime = null;

//     document.onkeydown = function (event) {
//         if (event.key == "Enter") {
//             let val = inp.value;
//             let currentTime = getCurrentTime();

//             // Check if the current message is from a different time
//             if (currentTime !== lastMessageTime) {
//                 // Display the time for the new message
//                 let timeNode = document.createElement("p");
//                 timeNode.classList.add("time");
//                 timeNode.textContent = currentTime;
//                 timeNode.style.textAlign = "center";

//                 let messageNode = document.createElement("li");
//                 messageNode.appendChild(timeNode);

//                 lastMessageTime = currentTime;
//                 message.appendChild(messageNode);
//             }

//             // Display the text of the message
//             let textNode = document.createElement("span");
//             textNode.textContent = val;
//             textNode.classList.add("text-right");

//             let messageNode = document.createElement("li");
//             messageNode.classList.add("text-right");
//             messageNode.appendChild(textNode);

//             message.appendChild(messageNode);
//             inp.value = "";

//             // Scroll to the bottom of the container
//             main.scrollTop = main.scrollHeight - main.clientHeight;
//         }
//     }

//     function getCurrentTime() {
//         let now = new Date();
//         let hours = now.getHours();
//         let minutes = now.getMinutes();
//         let ampm = hours >= 12 ? 'pm' : 'am';
//         hours = hours % 12;
//         hours = hours ? hours : 12; // Handle midnight (0:00)
//         minutes = minutes < 10 ? '0' + minutes : minutes;
//         let currentTime = `${hours}:${minutes}${ampm}`;
//         return currentTime;
//     }
// });