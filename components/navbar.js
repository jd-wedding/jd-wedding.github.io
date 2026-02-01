class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
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
                    box-sizing: border-box; /* WICHTIG: Padding wird in die Breite eingerechnet */
                    top: 0;
                    left: 0; /* Sicherstellen, dass sie links startet */
                    z-index: 1000;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .logo {
                    font-family: 'Playfair Display', serif;
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: var(--main-color);
                    text-decoration: none;
                    z-index: 1001; 
                }

                .nav-links {
                    display: flex;
                    justify-content: center; 
                    flex-grow: 1;
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
                }

                .mobile-menu-btn {
                    display: none; 
                    background: none;
                    border: none;
                    color: var(--main-color); 
                    cursor: pointer;
                    z-index: 1001;
                    padding: 5px;
                    width: 40px; /* Feste Größe geben */
                    height: 40px;
                }

                /* SVG Styling, falls Feather Icons geladen werden */
                .mobile-menu-btn svg {
                    width: 32px;
                    height: 32px;
                    stroke: currentColor;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    fill: none;
                }

                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: flex; /* Als Flexbox anzeigen um Icon zu zentrieren */
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .nav-links {
                        position: fixed;
                        top: 0; /* Von ganz oben */
                        left: 0;
                        width: 100%;
                        height: 100vh; /* Ganze Bildschirmhöhe für bessere Usability */
                        background: white;
                        flex-direction: column;
                        justify-content: center; /* Links vertikal zentrieren */
                        transform: translateX(100%); /* Von rechts nach links einschieben ist gängiger */
                        transition: transform 0.3s ease-in-out;
                        z-index: 999;
                    }
                    
                    .nav-links.active {
                        transform: translateX(0);
                    }
                }
            </style>
            <nav>
                <a href="/" class="logo">J&D Wedding</a>
                <button class="mobile-menu-btn" aria-label="Toggle mobile menu">
                    <!-- Fallback Icon (Hamburger) falls JS/Feather nicht lädt -->
                    <svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
                <ul class="nav-links">
                    <li><a href="/">Startseite</a></li>
                    <li><a href="#details">Details</a></li>
                    <li><a href="/registry.html">Wunschliste</a></li>
                    <li><a href="/rsvp.html">RSVP</a></li>
                </ul>
            </nav>
        `;

        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');

        // Funktion zum Icon-Wechsel
        const updateIcon = (isOpen) => {
            if (window.feather) {
                mobileMenuBtn.innerHTML = feather.icons[isOpen ? 'x' : 'menu'].toSvg();
            } else {
                // Einfacher CSS/SVG Toggle falls Feather nicht da ist
                mobileMenuBtn.innerHTML = isOpen ? 
                    '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' : 
                    '<svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        };

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            updateIcon(navLinks.classList.contains('active'));
        });

        // Menü schließen wenn ein Link geklickt wird
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
               navLinks.classList.remove('active');
                const href = link.getAttribute('href');

                if (href.startsWith('#')) {
                    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
                        // Wenn nicht auf der Startseite, zuerst zur Startseite wechseln
                        window.location.href = '/#' + href.substring(1); // Weiterleitung zur Startseite mit dem Hash
                    } else {
                        // Wenn bereits auf der Startseite, direkt zum Abschnitt scrollen
                        document.querySelector(href).scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
                updateIcon(false);
            });
        });
    }
}
customElements.define('custom-navbar', CustomNavbar);
