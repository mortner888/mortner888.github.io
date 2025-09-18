const map = document.getElementById('map'); // corretto dal tuo HTML

let isDragging = false;
let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0;
let scale = 1;
let lastTouchDist = null;

// Drag con mouse
map.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    map.classList.add('dragging');
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    map.classList.remove('dragging');
});

document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    updateTransform();
});

// Zoom con rotellina
map.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const rect = map.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const prevScale = scale;
    scale += e.deltaY < 0 ? zoomIntensity : -zoomIntensity;
    scale = Math.max(0.5, Math.min(3, scale));
    offsetX = offsetX - (mouseX - rect.width/2) * (scale/prevScale - 1);
    offsetY = offsetY - (mouseY - rect.height/2) * (scale/prevScale - 1);
    updateTransform();
});

// Drag e pinch su touch
map.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
    } else if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - offsetX;
        startY = e.touches[0].clientY - offsetY;
        map.classList.add('dragging');
    }
});

map.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 2) {
        const dist = getTouchDist(e.touches);
        const rect = map.getBoundingClientRect();
        const prevScale = scale;
        scale *= dist / lastTouchDist;
        scale = Math.max(0.5, Math.min(3, scale));
        const centerX = (e.touches[0].clientX + e.touches[1].clientX)/2 - rect.left;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY)/2 - rect.top;
        offsetX = offsetX - (centerX - rect.width/2) * (scale/prevScale - 1);
        offsetY = offsetY - (centerY - rect.height/2) * (scale/prevScale - 1);
        lastTouchDist = dist;
        updateTransform();
    } else if (e.touches.length === 1 && isDragging) {
        offsetX = e.touches[0].clientX - startX;
        offsetY = e.touches[0].clientY - startY;
        updateTransform();
    }
});

map.addEventListener('touchend', e => {
    if (e.touches.length < 2) lastTouchDist = null;
    if (e.touches.length === 0) isDragging = false;
    map.classList.remove('dragging');
});

function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
}

function updateTransform() {
    map.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
}