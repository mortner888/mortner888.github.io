document.addEventListener('DOMContentLoaded', () => {
  const popupOverlay = document.getElementById('popupOverlay');
  const popupClose = document.getElementById('popupClose');
  const popupImage = document.getElementById('popupImage');
  const popupTitle = document.getElementById('popupTitle');
  const popupDescription = document.getElementById('popupDescription');
  const popupLocation = document.getElementById('popupLocation');

  // Esempio oggetto dati boss, devi adattarlo al tuo
  const bossData = {
    'bell-beast': {
      title: 'Bell Beast',
      description: 'Descrizione di Bell Beast...',
      location: 'Locazione di Bell Beast',
      image: '../site/image/bestiary/bell-beast.png'
    },
    'bell-eater': {
      title: 'Bell Eater',
      description: 'Descrizione di Bell Eater...',
      location: 'Locazione di Bell Eater',
      image: '../site/image/bestiary/bell-eater.png'
    },
    // aggiungi tutti i boss...
  };

  // Prendi tutte le boss-icon e aggiungi click listener
  document.querySelectorAll('.boss-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const bossId = icon.querySelector('img').alt.toLowerCase().replace(/ /g, '-');
      const boss = bossData[bossId];

      if (boss) {
        popupTitle.textContent = boss.title;
        popupDescription.textContent = boss.description;
        popupLocation.textContent = boss.location;
        popupImage.src = boss.image;
        popupImage.alt = boss.title;

        popupOverlay.classList.add('active'); // mostra popup
      }
    });
  });

  // Chiudi popup al click sulla X
  popupClose.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
  });

  // Chiudi popup cliccando fuori dal contenuto
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove('active');
    }
  });
});
