document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('bossSearch');
    
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
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
    }
});