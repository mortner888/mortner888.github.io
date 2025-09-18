const map = document.getElementById('map');

let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;
let scale = 1;
let minScale = 1;
let maxScale = 3;

map.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    map.classList.add('dragging');
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    map.classList.remove('dragging');
});

document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    map.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
});

map.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomAmount = -e.deltaY * 0.001;
    scale += zoomAmount;
    if (scale < minScale) scale = minScale;
    if (scale > maxScale) scale = maxScale;
    map.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
});

map.addEventListener('dblclick', () => {
    scale = scale < 2 ? 2 : 1;
    map.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
});