const bikes = [
    { name: "Speedster Pro", type: "road", price: 1200 },
    { name: "Mountain Goat", type: "mountain", price: 1800 },
    { name: "Carbon Racer", type: "road", price: 2500 },
    { name: "Trail Master", type: "mountain", price: 1400 },
    { name: "Urban Rider", type: "road", price: 800 }
];

let activeFilter = 'all';

// Update Price display and re-filter
window.updatePrice = function(val) {
    const display = document.getElementById('price-display');
    if (display) display.innerText = `$${val}`;
    render();
};

// Handle Filter button clicks
window.filterType = function(type) {
    activeFilter = type;
    
    // UI: Update button active states
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(`'${type}'`)) {
            btn.classList.add('active');
        }
    });
    
    render();
};

// Draw the bikes to the screen
function render() {
    const list = document.getElementById('bike-list');
    if (!list) return;

    const maxPrice = parseInt(document.getElementById('price-slider').value);
    
    const html = bikes
        .filter(bike => (activeFilter === 'all' || bike.type === activeFilter) && bike.price <= maxPrice)
        .map(bike => `
            <div class="card">
                <div style="font-size: 10px; color: #9aa0a6; text-transform: uppercase;">${bike.type}</div>
                <div style="font-weight: bold; margin: 10px 0;">${bike.name}</div>
                <div style="color: #72f272; font-weight: 800;">$${bike.price}</div>
            </div>
        `).join('');

    list.innerHTML = html || '<p style="color: #9aa0a6; padding: 20px;">No matches found.</p>';
}

// Initial load
document.addEventListener('DOMContentLoaded', render);
