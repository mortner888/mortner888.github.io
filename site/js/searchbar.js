document.getElementById('bossSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const bossIcons = document.querySelectorAll('.boss-icon');
    
    bossIcons.forEach(boss => {
        const bossName = boss.querySelector('.tooltip-text').textContent.toLowerCase();
        
        // Cerca in qualsiasi parte del nome (anche parole separate)
        if (bossName.includes(searchTerm) || searchTerm === '') {
            boss.classList.remove('hidden');
            boss.style.animation = 'fadeIn 0.3s ease';
        } else {
            boss.style.animation = 'fadeOut 0.2s ease';
            setTimeout(() => {
                boss.classList.add('hidden');
            }, 200);
        }
    });
});