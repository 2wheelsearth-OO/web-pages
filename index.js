const bikes = [
    { name: "Team USA Road", price: 160, type: "road", img: "road_bike.jpg" },
    { name: "Hybrid 700C", price: 200, type: "road", img: "hybrid.jpg" },
    { name: "MTB Pro", price: 1200, type: "mtb", img: "mtb.jpg" }
];

let currentType = 'all';
let currentMaxPrice = 2000;

function updatePrice(val) {
    currentMaxPrice = val;
    document.getElementById('price-display').innerText = `$${val}`;
    renderBikes();
}

function filterType(type) {
    currentType = type;
    
    // Update button visual state
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === type) {
            btn.classList.add('active');
        }
    });
    
    renderBikes();
}

function renderBikes() {
    const list = document.getElementById('bike-list');
    list.innerHTML = '';

    const filtered = bikes.filter(bike => {
        const matchesType = currentType === 'all' || bike.type === currentType;
        const matchesPrice = bike.price <= currentMaxPrice;
        return matchesType && matchesPrice;
    });

    filtered.forEach(bike => {
        const item = document.createElement('div');
        item.className = 'bike-item';
        item.innerHTML = `
            <img src="${bike.img}" style="width:100%; border-radius:4px;">
            <p style="margin-top:10px; font-weight:bold;">$${bike.price}</p>
            <p style="font-size:0.8rem; color:#aaa;">${bike.name}</p>
        `;
        list.appendChild(item);
    });
}

// Initial render
renderBikes();
