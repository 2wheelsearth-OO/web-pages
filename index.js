// 1. Your Bike Data
const bikes = [
    { name: "Road Master 5000", type: "road", price: 1200 },
    { name: "Mountain Peak Pro", type: "mountain", price: 2500 },
    { name: "Urban Flyer", type: "road", price: 800 },
    { name: "Trail Blazer XT", type: "mountain", price: 1800 },
    { name: "Speedster Carbon", type: "road", price: 4500 }
];

// 2. State to keep track of user choices
let currentType = 'all';
let currentMaxPrice = 2000;

// 3. The Update Price Function (Matches your HTML oninput)
window.updatePrice = function(val) {
    currentMaxPrice = parseInt(val);
    document.getElementById('price-display').innerText = '$' + val;
    render();
};

// 4. The Filter Type Function (Matches your HTML onclick)
window.filterType = function(type) {
    currentType = type;
    
    // Update button styles
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(type) || (type === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        }
    });
    
    render();
};

// 5. The Render Function (The engine that shows the bikes)
function render() {
    const list = document.getElementById('bike-list');
    if (!list) return;

    // Clear the current list
    list.innerHTML = '';

    // Filter bikes based on user selection
    const filteredBikes = bikes.filter(bike => {
        const typeMatch = currentType === 'all' || bike.type === currentType;
        const priceMatch = bike.price <= currentMaxPrice;
        return typeMatch && priceMatch;
    });

    // Create the HTML for each bike card
    filteredBikes.forEach(bike => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'block'; // Ensure they aren't hidden
        card.innerHTML = `
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">${bike.name}</div>
            <div style="color: var(--highlight); font-weight: 800;">$${bike.price}</div>
            <div style="font-size: 10px; color: var(--dim); text-transform: uppercase;">${bike.type}</div>
        `;
        list.appendChild(card);
    });

    // If no bikes match
    if (filteredBikes.length === 0) {
        list.innerHTML = '<p style="color: var(--dim); font-size: 12px;">No bikes match your criteria.</p>';
    }
}

// 6. Initialize the page on load
document.addEventListener('DOMContentLoaded', render);
