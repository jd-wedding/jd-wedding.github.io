class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    /* Definiert die Hauptfarbe als CSS-Variable für einfache Wiederverwendung */
                    --main-color: #ff8c00; 
                    --text-color: #333;
                    --background-color: rgba(255, 255, 255, 0.9);
                }

                nav {
                    background: var(--background-color);
                    backdrop-filter: blur(10px);
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between; 
                    align-items: center;
                    position: fixed;
                    width: 100%;
                    top: 0;
                    z-index: 1000;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .logo {
                    font-family: 'Playfair Display', serif;
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: var(--main-color);
                    text-decoration: none;
                    /* Logo muss z-index haben, damit es über dem ausgeblendeten Menü bleibt */
                    position: relative; 
                    z-index: 1001; 
                }

                .nav-links {
                    /* Zentralisiert die Links im verfügbaren Raum für Desktop */
                    display: flex;
                    justify-content: center; 
                    flex-grow: 1; /* Nimmt den restlichen Platz zwischen Logo und Button ein */
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    align-items: center;
                }

                .nav-links a {
                    color: var(--text-color);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s;
                    position: relative;
                }

                .nav-links a:hover {
                    color: var(--main-color); 
                }

                .nav-links a:after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    background: var(--main-color); 
                    bottom: -4px;
                    left: 0;
                    transition: width 0.3s;
                }

                .nav-links a:hover:after {
                    width: 100%;
                }

                .mobile-menu-btn {
                    display: none; /* Standardmäßig ausgeblendet auf dem Desktop */
                    background: none;
                    border: none;
                    color: var(--main-color); 
                    font-size: 1.5rem;
                    cursor: pointer;
                    position: relative;
                    z-index: 1001; /* Button muss auch über dem Menü liegen */
                }

                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block; /* Auf mobilen Geräten anzeigen */
                    }
                    
                    .nav-links {
                        position: fixed;
                        top: 70px; /* Unterhalb der Navbar */
                        left: 0;
                        width: 100%;
                        background: white;
                        flex-direction: column;
                        gap: 1rem;
                        padding: 1rem 0;
                        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                        /* Versteckt das Menü standardmäßig außerhalb des Bildschirms */
                        transform: translateY(-150%); 
                        transition: transform 0.3s ease;
                        /* Zentrierung für mobile Ansicht deaktivieren */
                        flex-grow: unset; 
                        justify-content: unset;
                        z-index: 1000;
                    }
                    
                    /* Wenn die Klasse 'active' hinzugefügt wird, wird das Menü eingeblendet */
                    .nav-links.active {
                        transform: translateY(0);
                    }

                    .nav-links li {
                        width: 100%;
                        text-align: center;
                    }
                }
            </style>
            <nav>
                <a href="/" class="logo">J&D Wedding</a>
                <button class="mobile-menu-btn" aria-label="Toggle mobile menu">
                    <i data-feather="menu"></i>
                </button>
                <ul class="nav-links">
                    <li><a href="/">Startseite</a></li>
                    <li><a href="#details">Details</a></li>
                    <li><a href="/registry.html">Wunschliste</a></li>
                    <li><a href="/rsvp.html">RSVP</a></li>
                </ul>
            </nav>
            <!-- Feather Icons Skript für Icons -->
            <script src="unpkg.com"></script>
            <script>feather.replace();</script>
        `;

        // Mobile menu toggle Logik
        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-feather', 'x'); // Zeigt ein 'X' Symbol
            } else {
                icon.setAttribute('data-feather', 'menu'); // Zeigt ein 'Menu' Symbol
            }
            feather.replace(); // Ersetzt das Icon nach dem Attributwechsel
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);
