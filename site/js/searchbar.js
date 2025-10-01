document.getElementById('bossSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const bossIcons = document.querySelectorAll('.boss-icon');
    
    bossIcons.forEach(boss => {
        const bossName = boss.querySelector('.tooltip-text').textContent.toLowerCase();
        
        if (bossName.includes(searchTerm)) {
            boss.classList.remove('hidden');
        } else {
            boss.classList.add('hidden');
        }
    });
});