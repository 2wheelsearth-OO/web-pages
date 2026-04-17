body {
    background-color: #121212;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    display: flex;
    justify-content: center;
}

.container {
    width: 100%;
    max-width: 800px;
    padding: 40px 20px;
    text-align: center;
}

.header-wrap h1 {
    font-family: 'Permanent Marker', cursive;
    font-size: 4rem;
    margin: 0;
    letter-spacing: 4px;
}

.header-wrap p {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 40px;
    text-transform: uppercase;
}

.ui {
    background: #1e1e1e;
    padding: 25px;
    border-radius: 8px;
    display: inline-block;
    min-width: 400px;
}

.group {
    margin-bottom: 30px;
}

.sec-label, .sld-title {
    display: block;
    text-align: left;
    font-size: 0.8rem;
    color: #aaa;
    margin-bottom: 10px;
}

.row {
    display: flex;
    gap: 2px;
    background: #333;
    padding: 2px;
    border-radius: 4px;
}

.btn {
    flex: 1;
    background: transparent;
    border: none;
    color: #ccc;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
}

.btn.active {
    background: white;
    color: black;
}

.sld-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#price-display {
    font-weight: bold;
}

input[type=range] {
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
}

.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 40px;
}
