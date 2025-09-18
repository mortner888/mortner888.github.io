const map = document.getElementById('map');

let isDragging = false;
let startX = 0, startY = 0;
let currentX = 0, currentY = 0;
let scale = 1;

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
    map.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${scale})`;
});

map.addEventListener('dblclick', () => {
    scale = scale === 1 ? 1.5 : 1;
    map.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${scale})`;
});
