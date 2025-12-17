async function loadRegistry() {
    try {
        const response = await fetch('http://65.108.92.13:8080/gifts');
        const items = await response.json();
        const container = document.getElementById('registry-container');

        // Container leeren
        container.innerHTML = '';

        items.forEach(item => {
            // Bestimme das Bild basierend auf der ID (oder füge Bild-URLs in dein JSON ein)
            const imgSrc = item.id === 1 ? 'brater.jpg' : 'toys-delight-tablesetting-with-diffrent-plates-cutlery-decoraton-and-glasses.jpeg';

            const card = `
                <div class="bg-white p-6 rounded-lg shadow-sm border ${item.is_reserved ? 'opacity-50' : ''}">
                    <img src="${imgSrc}" alt="${item.name}" class="w-full h-48 object-cover rounded mb-4">
                    <h3 class="text-xl font-serif text-primary mb-2">${item.name}</h3>
                    <p class="text-gray-600 mb-2 font-bold">${item.price}</p>
                    <p class="text-gray-600 mb-4">${item.description}</p>
                    
                    <button 
                        class="reserve-btn px-6 py-2 rounded-full text-sm transition-all ${
                            item.is_reserved 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                            : 'bg-secondary hover:bg-secondary/90 text-black'
                        }" 
                        data-id="${item.id}"
                        ${item.is_reserved ? 'disabled' : ''}>
                        ${item.is_reserved ? 'Bereits reserviert' : 'Dieses Geschenk reservieren'}
                    </button>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
}

// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', loadRegistry);