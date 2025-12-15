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
            justify-content: space-between; /* Hält Logo links, Button rechts */
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
        }

        .nav-links {
            /* Zentralisiert die Links im verfügbaren Raum */
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
            color: var(--main-color); /* Hover-Farbe angepasst an Hauptfarbe */
        }

        .nav-links a:after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            background: var(--main-color); /* Unterstrich angepasst an Hauptfarbe */
            bottom: -4px;
            left: 0;
            transition: width 0.3s;
        }

        .nav-links a:hover:after {
            width: 100%;
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: var(--main-color); /* Button-Farbe angepasst an Hauptfarbe */
            font-size: 1.5rem;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem 0;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                transform: translateY(-150%);
                transition: transform 0.3s ease;
                /* Entfernt flex-grow und justify-content: center für die mobile Ansicht */
                flex-grow: unset; 
                justify-content: unset;
            }
            .nav-links.active {
                transform: translateY(0);
            }
            .mobile-menu-btn {
                display: block;
            }
        }
    </style>
    <nav>
        <a href="/" class="logo">J&D Wedding</a>
        <button class="mobile-menu-btn">
            <i data-feather="menu"></i>
        </button>
        <ul class="nav-links">
            <li><a href="/">Startseite</a></li>
            <li><a href="#details">Details</a></li>
            <li><a href="/registry.html">Wunschliste</a></li>
            <li><a href="/rsvp.html">RSVP</a></li>
        </ul>
    </nav>
    <script src="https://unpkg.com/feather-icons"></script>
    <script>feather.replace();</script>
        `;

        // Mobile menu toggle
        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);
