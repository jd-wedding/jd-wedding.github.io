async function loadRegistry() {
    try {
        const response = await fetch('https://giemsahomeserver.de/gifts');
        const items = await response.json();
        const container = document.getElementById('registry-container');

        // Container leeren
        container.innerHTML = '';

        const images = {
            1: 'brater.jpg',
            2: 'Carbonator-3_matte-black_45_e20b4fa1-30aa-4354-9b73-ff72f585b777 copy.jpg',
            3: 'Standlüfter.jpg',
            4: 'Saugrobo.jpg',
            5: 'Butterdose_Puro_Produkt.jpg',
            6: 'Brotschneider.jpg',
            7: 'muhle.jpg',
            8:'Backgammon.jpg',
            9:'A0S7HO_5K5THSBP_4pt83_litre160.jpg',
            10:'36116-200.jpg'
        };

        const cardsHtml = items.map(item => {
            // Bestimme das Bild basierend auf der ID (oder füge Bild-URLs in dein JSON ein)
            const imgSrc = images[item.id];
            console.log(`Item ID: ${item.id} (${item.name}) -> Bild: ${imgSrc}`);
            
            return `

                <div class="bg-white p-6 rounded-lg shadow-sm border ${item.is_reserved ? 'opacity-50' : ''}">
                    <img src="${imgSrc}" alt="${item.name}" class="w-full h-64 object-cover rounded mb-4">
                    <h3 class="text-xl font-serif text-primary mb-2">${item.name}</h3>
                    <p class="text-gray-600 mb-2 font-bold">${item.price}</p>
                    <p class="text-gray-600 mb-4">${item.description}</p>
                    <a href="${item.link}" target="_blank" class="block mb-6 text-primary hover:underline">Beispiel Link aus einem Online Shop</a>
                    
                    <button 
                        class="reserve-btn px-6 py-2 rounded-full text-sm transition-all ${
                            item.is_reserved 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                            : 'bg-secondary hover:bg-secondary/90 text-white'
                        }" 
                        data-id="${item.id}"
                        ${item.is_reserved ? 'disabled' : ''}>
                        ${item.is_reserved ? 'Bereits reserviert' : 'Dieses Geschenk reservieren'}
                    </button>
                </div>
            `;
        }).join('');

        container.innerHTML = cardsHtml;
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
}

// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', loadRegistry);