document.addEventListener('DOMContentLoaded', function() {
    // ===== SEARCHBAR FUNCTIONALITY =====
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

    // ===== POPUP FUNCTIONALITY =====
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupLocation = document.getElementById('popupLocation');
    const bossIcons = document.querySelectorAll('.boss-icon');

    // Dati dei boss (aggiungi descrizioni e location per ogni boss)
    const bossData = {
        'Bell Beast': {
            description: 'A fearsome creature that guards the ancient bells.',
            location: 'Found in the Bell Tower area.'
        },
        'Bell Eater': {
            description: 'A massive beast that consumes bells for sustenance.',
            location: 'Deep within the Bell Sanctum.'
        },
        'Broadmother': {
            description: 'The matriarch of her brood, commanding legions.',
            location: 'Deepnest Caverns.'
        },
        'Clover Dancers': {
            description: 'Graceful fighters who move as one.',
            location: 'Clover Fields.'
        },
        'Cogwork Dancers': {
            description: 'Mechanical warriors synchronized in battle.',
            location: 'The Clockwork District.'
        },
        'Crawfather': {
            description: 'An ancient being of immense power.',
            location: 'The Ancient Basin.'
        },
        'Crust King Khann': {
            description: 'A crustacean ruler of great strength.',
            location: 'The Coral Throne.'
        },
        'Disgraced Chef Lugoli': {
            description: 'A fallen chef seeking redemption through combat.',
            location: 'The Kitchen Ruins.'
        },
        'Father Of The Flame': {
            description: 'A being of pure fire and fury.',
            location: 'The Volcanic Chambers.'
        },
        'First Sinner': {
            description: 'The original transgressor against the old laws.',
            location: 'The Penitent Path.'
        },
        'Forebrothers': {
            description: 'Twin warriors bound by oath.',
            location: 'The Twin Peaks.'
        },
        'Fourth Chorus': {
            description: 'A harmonious entity of four voices.',
            location: 'The Singing Caverns.'
        },
        'Garmond And Zaza': {
            description: 'A deadly duo who fight as one.',
            location: 'The Partner\'s Arena.'
        },
        'Grand Mother Silk': {
            description: 'The elder weaver of fate.',
            location: 'The Silk Cradle.'
        },
        'Great Conchfly': {
            description: 'A massive flying shell creature.',
            location: 'The Sky Gardens.'
        },
        'Groal The Great': {
            description: 'A champion of legendary prowess.',
            location: 'The Colosseum.'
        },
        'Gurr The Outcast': {
            description: 'A exile seeking to prove their worth.',
            location: 'The Wastes.'
        },
        'Lace': {
            description: 'A mysterious warrior with deadly precision.',
            location: 'Multiple locations throughout Pharloom.'
        },
        'Last Judge': {
            description: 'The final arbiter of justice.',
            location: 'The Judgment Hall.'
        },
        'Lost Garmond': {
            description: 'A fallen warrior, lost to madness.',
            location: 'The Forgotten Quarter.'
        },
        'Lost Lace': {
            description: 'A corrupted version of the legendary warrior.',
            location: 'The Deep Dark.'
        },
        'Moorwing': {
            description: 'A creature of the moors and skies.',
            location: 'The Misty Moors.'
        },
        'Moss Mother': {
            description: 'The nurturing guardian of the overgrowth.',
            location: 'The Moss Grotto.'
        },
        'Nyleth': {
            description: 'A mysterious entity of shadow.',
            location: 'The Shadow Realm.'
        },
        'Palestag': {
            description: 'A territorial beast defending its domain.',
            location: 'The Pale Cliffs.'
        },
        'Phantom': {
            description: 'An ethereal presence that haunts the halls.',
            location: 'The Haunted Corridors.'
        },
        'Pinstress': {
            description: 'A deadly seamstress with razor-sharp needles.',
            location: 'The Tailor\'s Workshop.'
        },
        'Plasmified Zango': {
            description: 'A corrupted form of a once-noble warrior.',
            location: 'The Contamination Zone.'
        },
        'Raging Conchfly': {
            description: 'An enraged flying beast.',
            location: 'The Storm Peaks.'
        },
        'Savage Beastfly': {
            description: 'A feral predator of the skies.',
            location: 'The Wild Heights.'
        },
        'Second Sentinel': {
            description: 'The second guardian of an ancient gate.',
            location: 'The Gate of Two.'
        },
        'Shakra': {
            description: 'A mystical entity of great power.',
            location: 'The Sacred Temple.'
        },
        'Shrine Guardian Seth': {
            description: 'The eternal protector of a sacred place.',
            location: 'The Shrine of Seth.'
        },
        'Sister Splinter': {
            description: 'A deadly warrior with a fractured past.',
            location: 'The Broken Cathedral.'
        },
        'Skarrgard': {
            description: 'A scarred veteran of countless battles.',
            location: 'The Warrior\'s Rest.'
        },
        'Skarrsinger Karmelita': {
            description: 'A bard who weaponizes her voice.',
            location: 'The Grand Opera House.'
        },
        'Skull Tyrant': {
            description: 'A ruthless ruler adorned with bones.',
            location: 'The Bone Palace.'
        },
        'Summoned Saviour': {
            description: 'A being called forth to protect or destroy.',
            location: 'The Summoning Chamber.'
        },
        'The Unravelled': {
            description: 'A entity that came undone.',
            location: 'The Void Beyond.'
        },
        'Tormented Trobbio': {
            description: 'A tormented soul seeking peace.',
            location: 'The Torture Chambers.'
        },
        'Trobbio': {
            description: 'A peculiar creature with unique abilities.',
            location: 'The Underground Market.'
        },
        'Voltvyrm': {
            description: 'An electric wyrm of devastating power.',
            location: 'The Thunder Caverns.'
        },
        'Watcher At The Edge': {
            description: 'An observer stationed at the world\'s boundary.',
            location: 'The Edge of Pharloom.'
        },
        'Widow': {
            description: 'A deadly spider-like predator.',
            location: 'The Widow\'s Lair.'
        }
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
            document.body.style.overflow = 'hidden';
        });
    });

    // Chiudi pop-up
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
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