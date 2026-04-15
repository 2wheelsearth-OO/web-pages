// Function to update the price display and filter list
function updatePrice(value) {
    document.getElementById('price-display').innerText = '$' + value;
    // logic to filter bikes by price goes here
}

// Function to handle bike type filtering
function filterType(type) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the clicked button
    event.target.classList.add('active');

    console.log("Filtering by:", type);
    // logic to filter bikes by type goes here
}

// Initial setup or data loading can go here
