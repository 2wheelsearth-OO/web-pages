<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Velocipede | Matchmaker</title>
    <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg: #0e0e11; --txt: #e3e3e3; --dim: #9aa0a6;
            --brd: #3c4043; --box: #1e1e21; --accent: #4c4c4f;
            --highlight: #72f272;
        }

        html, body { 
            height: 100%; margin: 0; background: var(--bg); color: var(--txt);
            font-family: "Google Sans", sans-serif; -webkit-font-smoothing: antialiased;
            overflow: hidden; display: flex; flex-direction: column; 
            align-items: center; justify-content: flex-start; padding-top: 40px;
        }

        .corner { position: fixed; font-size: 10px; color: var(--dim); letter-spacing: 0.1em; text-transform: uppercase; z-index: 100; opacity: 0.4; }
        .tl { top: 10px; left: 15px; } .tr { top: 10px; right: 15px; }
        .bl { bottom: 10px; left: 15px; } .br { bottom: 10px; right: 15px; }
        
        .header-wrap { width: 100%; max-width: 500px; text-align: center; margin-bottom: 20px; flex-shrink: 0; }
        h1 { font-family: 'Permanent Marker', cursive; font-size: 1.6rem; margin: 0; transform: scaleY(1.2) rotate(-0.5deg); text-transform: uppercase; }
        .sub { font-size: 11px; color: var(--dim); margin-top: 2px; opacity: 0.7; text-transform: uppercase; letter-spacing: 1px; }

        .ui { width: 400px; z-index: 10; padding: 0; box-sizing: border-box; flex-shrink: 0; }
        .group { margin-bottom: 18px; position: relative; width: 100%; } 
        .type-label { font-size: 11px; color: var(--dim); text-transform: uppercase; text-align: center; display: block; margin-bottom: 8px; font-weight: 600; opacity: 0.6; }
        .row { display: flex; gap: 8px; }
        .btn { flex: 1; padding: 10px 2px; border: 1px solid var(--brd); background: transparent; color: var(--dim); border-radius: 8px; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; }
        .btn.active { background: var(--box); color: #fff; border-color: var(--highlight); }

        .sld-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; height: 20px; }
        .sld-title { font-size: 13px; color: var(--dim); }
        .sld-value { font-size: 16px; font-weight: 800; color: var(--txt); font-variant-numeric: tabular-nums; }

        input[type=range] { -webkit-appearance: none; width: 100%; background: transparent; cursor: pointer; }
        input[type=range]::-webkit-slider-runnable-track { height: 1px; background: #3c4043; }
        input[type=range]::-webkit-slider-thumb {
            height: 24px; width: 24px; -webkit-appearance: none; margin-top: -12px; 
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg>') no-repeat center;
            background-size: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));
        }

        .match-feedback-row { height: 16px; margin-top: 4px; text-align: right; }
        .match-msg { font-size: 12px; color: var(--highlight); font-weight: 800; text-transform: uppercase; visibility: hidden; }
        .match-msg.show { visibility: visible; }

        .gallery-container { width: 100%; flex-grow: 1; position: relative; display: flex; align-items: flex-start; justify-content: center; margin-top: 10px; overflow: hidden; }
        .gallery { display: flex; gap: 15px; width: 100%; justify-content: center; overflow-x: auto; padding: 20px; z-index: 5; scrollbar-width: none; }
        .gallery::-webkit-scrollbar { display: none; }

        .card { width: 160px; flex-shrink: 0; text-align: center; display: none; }
        .img-box { background: rgba(255,255,255,0.03); border-
