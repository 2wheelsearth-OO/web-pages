
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
