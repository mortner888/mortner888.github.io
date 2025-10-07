// Tutto parte solo quando la pagina è caricata
document.addEventListener('DOMContentLoaded', function() {
  // Elementi pop-up
  const popupOverlay = document.getElementById('popupOverlay');
  const popupClose = document.getElementById('popupClose');
  const popupImage = document.getElementById('popupImage');
  const popupTitle = document.getElementById('popupTitle');
  const popupDescription = document.getElementById('popupDescription');
  const popupLocation = document.getElementById('popupLocation');
  const bossIcons = document.querySelectorAll('.boss-icon');
  const searchBox = document.querySelector('.search-box');

  // Dati dei boss (puoi aggiungere qui tutte le info)
  const bossData = {
    'Bell Beast': {
      description: 'A fearsome creature that guards the ancient bells.',
      location: 'Found in the Bell Tower area.'
    },
    'Bell Eater': {
      description: 'A massive beast that consumes bells for sustenance.',
      location: 'Deep within the Bell Sanctum.'
    },
    // ...aggiungi altri boss qui
  };

  // ---- POP-UP ----
  bossIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const bossName = this.querySelector('.tooltip-text').textContent;
      const bossImg = this.querySelector('img').src;
      
      popupImage.src = bossImg;
      popupTitle.textContent = bossName;
      
      if (bossData[bossName]) {
        popupDescription.textContent = bossData[bossName].description;
        popupLocation.textContent = bossData[bossName].location;
      } else {
        popupDescription.textContent = 'Description coming soon...';
        popupLocation.textContent = 'Location coming soon...';
      }
      
      popupOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  popupClose.addEventListener('click', closePopup);

  popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) closePopup();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
      closePopup();
    }
  });

  // ---- BARRA DI RICERCA ----
  if (searchBox) {
    searchBox.addEventListener('input', () => {
      const searchTerm = searchBox.value.toLowerCase();

      bossIcons.forEach(icon => {
        const tooltip = icon.querySelector('.tooltip-text');
        const bossName = tooltip ? tooltip.textContent.toLowerCase() : '';

        if (bossName.includes(searchTerm)) {
          icon.classList.remove('hidden');
        } else {
          icon.classList.add('hidden');
        }
      });
    });
  }
});
