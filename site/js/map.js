const map = document.getElementById('map');
let scale = 1;
let originX = 0;
let originY = 0;

// Applica i limiti e centra la mappa se troppo piccola
function applyLimits() {
    const wrapper = map.parentElement.getBoundingClientRect();
    const mapRect = {
        width: map.naturalWidth,
        height: map.naturalHeight
    };

    const scaledWidth = mapRect.width * scale;
    const scaledHeight = mapRect.height * scale;

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
    map.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
});

// Zoom touch (pinch) per mobile
let lastTouchDist = null;

map.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
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
        map.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
        lastTouchDist = dist;
    }
});

map.addEventListener('touchend', e => {
    if (e.touches.length < 2) lastTouchDist = null;
});

// Calcola la distanza tra due tocchi
function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
}
