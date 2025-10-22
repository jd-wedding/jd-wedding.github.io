class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: #9C7A97;
                    color: white;
                    padding: 3rem 2rem;
                    text-align: center;
                }
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    text-align: left;
                }
                .footer-section h3 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                    color: #EFD6D2;
                }
                .footer-section p, .footer-section a {
                    color: white;
                    margin-bottom: 0.5rem;
                    display: block;
                    text-decoration: none;
                }
                .footer-section a:hover {
                    text-decoration: underline;
                }
                .social-icons {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .social-icons a {
                    color: white;
                    transition: color 0.3s;
                }
                .social-icons a:hover {
                    color: #EFD6D2;
                }
                .copyright {
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.2);
                    font-size: 0.9rem;
                }
                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    .social-icons {
                        justify-content: center;
                    }
                }
            </style>
            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Kontakt</h3>
                        <p><i data-feather="mail" class="inline mr-2"></i> sarahundmichael@example.com</p>
                        <p><i data-feather="phone" class="inline mr-2"></i> (123) 456-7890</p>
</div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <a href="/">Startseite</a>
                        <a href="#details">Hochzeitsdetails</a>
                        <a href="/registry.html">Wunschliste</a>
                        <a href="/rsvp.html">RSVP</a>
</div>
                    <div class="footer-section">
                        <h3>Begleitet uns</h3>
<div class="social-icons">
                            <a href="#"><i data-feather="instagram"></i></a>
                            <a href="#"><i data-feather="facebook"></i></a>
                            <a href="#"><i data-feather="twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div class="copyright">
                    <p>&copy; 2024 Sarah & Michaels Hochzeit. Alle Rechte vorbehalten.</p>
</div>
            </footer>
            <script src="https://unpkg.com/feather-icons"></script>
            <script>feather.replace();</script>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);