document.addEventListener('DOMContentLoaded', () => {
    // WhatsApp Configuration
    const PHONE_NUMBER = '34619884501'; // Sonia Fidalgo García

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Build WhatsApp Message
            const text = `Hola Sonia! 🚀\n\nMe pongo en contacto contigo a través de la web VIBOASESOR.\n\n👤 *Nombre:* ${name}\n📧 *Email:* ${email}\n💼 *Servicio:* ${service}\n💬 *Mensaje:* ${message || 'Sin mensaje adicional'}\n\nQuedo a la espera de tu respuesta para empezar a ahorrar.`;
            
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedText}`;

            // Visual feedback
            formStatus.textContent = 'Abriendo WhatsApp...';
            formStatus.style.color = 'var(--text-muted)';

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                formStatus.textContent = '¡Enviado a WhatsApp!';
                formStatus.style.color = 'var(--accent)';
                contactForm.reset();
            }, 800);
        });
    }

    // Scroll reveal simple
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    // Apply reveal classes to sections
    const revealElements = document.querySelectorAll('.service-card, .process-step, .contact-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // CSS class for visible state (injected via JS for simplicity in this small project)
    const styleLine = document.createElement('style');
    styleLine.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleLine);
});
