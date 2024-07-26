console.log('new-post.js loaded');
// const user = $.get('/api/user_data').then(function (data) {
//     return data;
// });

// Get a reference to the "Create New Listing" element
const createListingBtn = document.getElementById('create-listing-btn');
const newListingForm = document.getElementById('new-listing-form');

// Add an event listener to the form's submit event
newListingForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const condition = document.getElementById('condition').value;

    if (!title || !description || !price || !condition) {
        alert('Please fill out all required fields.');
        return;
    }

    // // Check if all required fields are filled out
    // const requiredFields = ['title', 'type', 'description', 'price']; // Replace with your actual required field names

    // // Perform validation
    // if (allFieldsFilled) {
    //     // If all required fields are filled out, submit the form data
        submitNewListing( {title, description, price, condition} );
//     } else {
//         // If some required fields are missing, display an error message
//         displayErrorMessage('Please fill out all required fields.');
//     }
});

// Function to submit the new listing
function submitNewListing(formData) {
    // Send an AJAX request to the server
    console.log(formData);
    fetch('/api/listings/create', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Handle successful submission
                console.log('New listing submitted successfully!');
                // Optionally, you can redirect the user or perform additional actions
                window.location.href = "/";
            } else {
                // Handle error response
                console.error('Error submitting new listing:', response.status);
            }
        })
        .catch(error => {
            console.error('Error submitting new listing:', error);
        });
}

// // Add a click event listener
// createListingBtn.addEventListener('click', () => {
//     // Redirect to the new listing page
//     window.location.href = '/new-post';
// });

function displayErrorMessage(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
}
