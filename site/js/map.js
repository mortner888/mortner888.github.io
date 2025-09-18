const map = document.getElementById('map');

let isDragging = false;
let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0;
let scale = 1;

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
    const prevScale = scale;
    scale += e.deltaY < 0 ? zoomIntensity : -zoomIntensity;
    scale = Math.max(0.5, Math.min(3, scale));
    updateTransform();
});

function updateTransform() {
    map.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}
