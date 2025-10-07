// Gestione pop-up
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupLocation = document.getElementById('popupLocation');
    const bossIcons = document.querySelectorAll('.boss-icon');

    // Dati dei boss (da compilare con le tue informazioni)
    const bossData = {
        'Bell Beast': {
            description: 'A fearsome creature that guards the ancient bells.',
            location: 'Found in the Bell Tower area.'
        },
        'Bell Eater': {
            description: 'A massive beast that consumes bells for sustenance.',
            location: 'Deep within the Bell Sanctum.'
        },
        // Aggiungi qui tutti gli altri boss...
    };

    // Apri pop-up quando clicchi su un boss
    bossIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const bossName = this.querySelector('.tooltip-text').textContent;
            const bossImg = this.querySelector('img').src;
            
            popupImage.src = bossImg;
            popupTitle.textContent = bossName;
            
            // Carica dati del boss se esistono
            if (bossData[bossName]) {
                popupDescription.textContent = bossData[bossName].description;
                popupLocation.textContent = bossData[bossName].location;
            } else {
                popupDescription.textContent = 'Description coming soon...';
                popupLocation.textContent = 'Location coming soon...';
            }
            
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Blocca scroll della pagina
        });
    });

    // Chiudi pop-up
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Riabilita scroll
    }

    popupClose.addEventListener('click', closePopup);
    
    // Chiudi cliccando fuori dal pop-up
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Chiudi con tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
});