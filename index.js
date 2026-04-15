const bikes = [
    { name: "Speed Carbon", type: "road", price: 1500 },
    { name: "Dirt Jumper", type: "mountain", price: 900 },
    { name: "Apex Racer", type: "road", price: 2500 },
    { name: "Rocky Path", type: "mountain", price: 1100 }
];

window.updatePrice = (v) => {
    document.getElementById('price-display').innerText = `$${v}`;
    render();
}

window.filterType = (type) => {
    // Logic to switch active buttons and re-render
    render(type);
}

function render(filter = 'all') {
    const list = document.getElementById('bike-list');
    const maxP = document.getElementById('price-slider').value;
    list.innerHTML = bikes
        .filter(b => (filter === 'all' || b.type === filter) && b.price <= maxP)
        .map(b => `<div class="card"><h3>${b.name}</h3><p>$${b.price}</p></div>`)
        .join('');
}

render();
