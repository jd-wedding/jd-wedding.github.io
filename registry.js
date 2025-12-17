// Basis-URL der API (ersetze durch die tatsächliche IP/Domain)
const API_BASE_URL = 'http://65.108.92.13:8080'; 

async function loadGifts() {
    const container = document.getElementById('gift-container');
    container.innerHTML = ''; // Container leeren

    try {
        const response = await fetch(`${API_BASE_URL}/gifts`);
        const gifts = await response.json();

        gifts.forEach(gift => {
            const card = document.createElement('div');
            card.className = 'bg-white p-6 rounded-lg shadow-sm border border-gray-100';
            
            // Text für den Button und CSS-Klasse basierend auf dem Reservierungsstatus
            let buttonHtml;
            if (gift.is_reserved) {
                buttonHtml = `<button disabled class="bg-gray-400 text-white px-6 py-2 rounded-full text-sm cursor-not-allowed">Reserviert von ${gift.reserved_by}</button>`;
            } else {
                buttonHtml = `<button class="reserve-btn bg-secondary hover:bg-secondary/90 text-white px-6 py-2 rounded-full text-sm transition-all" data-id="${gift.id}">Dieses Geschenk reservieren</button>`;
            }

            card.innerHTML = `
                <img src="${gift.imageUrl || 'Registry/Bräter.jpg'}" alt="${gift.name}" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="text-xl font-serif text-primary mb-2">${gift.name}</h3>
                <p class="text-gray-600 mb-2">${gift.price.toFixed(2)} €</p>
                <p class="text-gray-600 mb-4">${gift.description}</p>
                ${buttonHtml}
            `;
            container.appendChild(card);
        });

        // Event Listener für alle "Reservieren"-Buttons hinzufügen
        document.querySelectorAll('.reserve-btn').forEach(button => {
            button.addEventListener('click', () => {
                openReservationModal(button.dataset.id);
            });
        });

    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
        container.innerHTML = '<p>Produkte konnten nicht geladen werden.</p>';
    }
}


// --- Modal- und Reservierungslogik ---

const modal = document.getElementById('reservation-modal');
const confirmBtn = document.getElementById('confirm-reservation');
const cancelBtn = document.getElementById('cancel-reservation');
const nameInput = document.getElementById('guest-name-input');
let currentGiftId = null; // Speichert die ID des aktuell ausgewählten Geschenks

function openReservationModal(giftId) {
    currentGiftId = giftId;
    modal.classList.remove('hidden');
}

cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    nameInput.value = '';
    currentGiftId = null;
});

confirmBtn.addEventListener('click', async () => {
    const guestName = nameInput.value.trim();

    if (!guestName || !currentGiftId) {
        alert("Bitte geben Sie Ihren Namen ein.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/gifts/${currentGiftId}/reserve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guest_name: guestName }),
        });

        if (response.ok) {
            alert("Das Geschenk wurde erfolgreich reserviert!");
            // Modal schließen und Liste neu laden, um den Status zu aktualisieren
            modal.classList.add('hidden');
            nameInput.value = '';
            loadGifts(); 
        } else {
            const errorData = await response.json();
            alert(`Reservierung fehlgeschlagen: ${errorData.error || 'Unbekannter Fehler'}`);
        }
    } catch (error) {
        console.error('Fehler bei der Reservierungsanfrage:', error);
        alert('Ein Netzwerkfehler ist aufgetreten.');
    }
});


// Funktion beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', loadGifts);
