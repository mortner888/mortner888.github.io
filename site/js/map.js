const map = document.getElementById('map');
let scale = 1;
let originX = 0;
let originY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

// Dimensioni iniziali dell'immagine renderizzata
let baseWidth, baseHeight;

window.addEventListener('load', () => {
    const rect = map.getBoundingClientRect();
    baseWidth = rect.width;
    baseHeight = rect.height;
    centerMap();
    updateTransform();
});

// Centra la mappa inizialmente
function centerMap() {
    const wrapper = map.parentElement.getBoundingClientRect();
    originX = (wrapper.width - baseWidth) / 2;
    originY = (wrapper.height - baseHeight) / 2;
}

// Applica i limiti e centra se più piccola del wrapper
function applyLimits() {
    const wrapper = map.parentElement.getBoundingClientRect();
    const scaledWidth = baseWidth * scale;
    const scaledHeight = baseHeight * scale;

    if (scaledWidth < wrapper.width) {
        originX = (wrapper.width - scaledWidth) / 2;
    } else {
        const minX = wrapper.width - scaledWidth;
        const maxX = 0;
        originX = Math.min(maxX, Math.max(minX, originX));
    }

    if (scaledHeight < wrapper.height) {
        originY = (wrapper.height - scaledHeight) / 2;
    } else {
        const minY = wrapper.height - scaledHeight;
        const maxY = 0;
        originY = Math.min(maxY, Math.max(minY, originY));
    }
}

// Aggiorna il transform
function updateTransform() {
    map.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
}

// ----------------- ZOOM -------------------

// Zoom con rotellina del mouse
map.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = map.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomIntensity = 0.1;
    const delta = e.deltaY < 0 ? zoomIntensity : -zoomIntensity;
    const newScale = Math.max(0.5, Math.min(3, scale + delta));
    const scaleRatio = newScale / scale;

    originX = originX - mouseX * (scaleRatio - 1);
    originY = originY - mouseY * (scaleRatio - 1);

    scale = newScale;
    applyLimits();
    updateTransform();
});

// Zoom con doppio click
map.addEventListener('dblclick', e => {
    e.preventDefault();
    const rect = map.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const zoomFactor = 1.5;
    const prevScale = scale;
    scale = (scale >= 1.5) ? 1 : scale * zoomFactor;

    originX = originX - (clickX * (scale / prevScale - 1));
    originY = originY - (clickY * (scale / prevScale - 1));

    applyLimits();
    updateTransform();
});

// Pinch touch
let lastTouchDist = null;

map.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
    } else if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - originX;
        startY = e.touches[0].clientY - originY;
    }
});

map.addEventListener('touchmove', e => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const rect = map.getBoundingClientRect();
        const centerX = (e.touches[0].clientX + e.touches[1].clientX)/2 - rect.left;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY)/2 - rect.top;

        const dist = getTouchDist(e.touches);
        const newScale = Math.max(0.5, Math.min(3, scale * (dist / lastTouchDist)));
        const scaleRatio = newScale / scale;

        originX = originX - (centerX * (scaleRatio - 1));
        originY = originY - (centerY * (scaleRatio - 1));

        scale = newScale;
        applyLimits();
        updateTransform();
        lastTouchDist = dist;
    } else if (e.touches.length === 1 && isDragging) {
        originX = e.touches[0].clientX - startX;
        originY = e.touches[0].clientY - startY;
        applyLimits();
        updateTransform();
    }
});

map.addEventListener('touchend', e => {
    if (e.touches.length < 2) lastTouchDist = null;
    if (e.touches.length === 0) isDragging = false;
});

// ----------------- DRAG -------------------
map.addEventListener('mousedown', e => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - originX;
    startY = e.clientY - originY;
});

document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    originX = e.clientX - startX;
    originY = e.clientY - startY;
    applyLimits();
    updateTransform();
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// ----------------- UTILITY -----------------
function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
}
