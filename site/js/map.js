const map = document.getElementById('map');

let isDragging = false;
let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0;
let scale = 1;
let zoomed = false;

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
    map.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
});

map.addEventListener('dblclick', () => {
    scale = zoomed ? 1 : 1.5;
    zoomed = !zoomed;
    map.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
});

