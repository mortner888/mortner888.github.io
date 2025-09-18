const map = document.getElementById('map');
let scale = 1;

// Zoom con rotellina del mouse
map.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    scale += e.deltaY < 0 ? zoomIntensity : -zoomIntensity;
    scale = Math.max(0.5, Math.min(3, scale)); // limiti min/max
    map.style.transform = `scale(${scale})`;
});

// Zoom touch con pinch (mobile)
let lastTouchDist = null;

map.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
    }
});

map.addEventListener('touchmove', e => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getTouchDist(e.touches);
        scale *= dist / lastTouchDist;
        scale = Math.max(0.5, Math.min(3, scale));
        map.style.transform = `scale(${scale})`;
        lastTouchDist = dist;
    }
});

map.addEventListener('touchend', e => {
    if (e.touches.length < 2) lastTouchDist = null;
});

// Funzione helper per calcolare la distanza tra due tocchi
function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
}

