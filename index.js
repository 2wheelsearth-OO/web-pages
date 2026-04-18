const GITHUB_API = "https://api.github.com/repos/2wheelsearth-OO/Assets/contents/";
const RAW_URL = "https://raw.githubusercontent.com/2wheelsearth-OO/Assets/main/";

let inventory = [];
let styleFilter = 'any';

function parseBikeData(name) {
    const pattern = /(\d+)([MFU])(\d{4})/i;
    const match = name.match(pattern);
    if (!match) return null;
    
    const wPart = match[3].substring(0, 2);
    const wSize = wPart === '70' ? "700C" : wPart;
    const fSize = parseInt(match[3].substring(2));

    return {
        id: name,
        file: name,
        price: parseInt(match[1]),
        type: match[2].toUpperCase(),
        wheel: wSize,
        frame: fSize,
        isChild: (parseInt(wPart) <= 20),
        img: RAW_URL + encodeURIComponent(name)
    };
}

async function init() {
    try {
        const res = await fetch(GITHUB_API);
        const files = await res.json();
        inventory = files
            .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f.name))
            .map(f => parseBikeData(f.name))
            .filter(b => b !== null)
            .sort((a, b) => a.price - b.price);

        document.getElementById('loading-status').style.display = 'none';
        const gallery = document.getElementById('bike-gallery');
        
        inventory.forEach(b => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = `bike-${b.id}`;
            card.innerHTML = `
                <div class="img-box"><img loading="lazy" src="${b.img}"></div>
                <div class="price-label">$${b.price}</div>
                <div class="debug-filename">${b.file}</div>
                <div class="debug-specs">${b.wheel} Whl / ${b.frame}" Frame</div>
            `;
            gallery.appendChild(card);
        });
        runUpdate();
    } catch (e) { console.error("Load failed", e); }
    setInterval(updateClock, 1000);
    updateClock();
}

function setS(val) {
    styleFilter = val;
    document.querySelectorAll('.btn').forEach(b => b.classList.toggle('active', b.id === `b-${val}`));
    runUpdate();
}

function runUpdate() {
    if (!inventory.length) return;
    
    const riderH = parseFloat(document.getElementById('hS').value);
    const budgetIn = document.getElementById('bS').value;
    const targetPrice = Math.round(50 + (1000 - 50) * Math.pow(budgetIn / 100, 2));
    
    const ft = Math.floor(riderH / 12);
    const inch = Math.round(riderH % 12);
    const metric = Math.round(riderH * 2.54);
    
    document.getElementById('hL').innerText = `${ft}'${inch}" (${metric}cm)`;
    document.getElementById('bL').innerText = `$${targetPrice}`;

    const isAdult = (riderH >= 60);
    let spreadFound = 50;
    let winners = [];

    for (let s = 50; s >= 0; s -= 5) {
        spreadFound = s;
        winners = inventory.filter(b => {
            const priceOk = (b.price >= (targetPrice - s) && b.price <= (targetPrice + s));
            const typeOk = (styleFilter === 'any' || b.type === 'U' || b.type === styleFilter);
            const ageOk = (isAdult !== b.isChild);
            let sizeOk = !b.isChild 
                ? (riderH >= (b.frame + 44) && riderH <= (b.frame + 58)) 
                : (riderH >= (b.frame + 30) && riderH <= (b.frame + 55));
            return priceOk && typeOk && ageOk && sizeOk;
        });
        if (winners.length <= 3) break;
    }

    const msg = document.getElementById('matchRange');
    if (winners.length > 0) {
        msg.innerText = `MATCHES FOUND: $${targetPrice - spreadFound} — $${targetPrice + spreadFound}`;
        msg.classList.add('show');
    } else {
        msg.classList.remove('show');
    }

    const winnerIds = winners.map(w => w.id);
    inventory.forEach(b => {
        const el = document.getElementById(`bike-${b.id}`);
        if (el) el.style.display = winnerIds.includes(b.id) ? 'block' : 'none';
    });
}

function updateClock() {
    const now = new Date();
    document.getElementById('d').innerText = now.toLocaleDateString().toUpperCase();
    document.getElementById('t').innerText = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    const res = document.getElementById('s');
    if(res) res.innerText = `${window.innerWidth}X${window.innerHeight}`;
}
