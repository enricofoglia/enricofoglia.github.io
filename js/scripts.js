document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('[data-section]');
    const navLinks = document.querySelectorAll('.nav__link');

    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('section--hidden');
                setTimeout(() => section.style.opacity = 1, 10);
            } else {
                section.style.opacity = 0;
                setTimeout(() => section.classList.add('section--hidden'), 300);
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Special handling for CV link
            if (targetId === 'cv') {
                window.open('./files/cv_US.pdf', '_blank', 'noopener,noreferrer');
                return;
            }
            
            showSection(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    // Handle initial load and browser navigation
    const handleNavigation = () => {
        const hash = location.hash.substring(1) || 'about';
        if (hash === 'cv') {
            window.open('./files/cv_US.pdf', '_blank', 'noopener,noreferrer');
            history.pushState(null, '', '#about');
            showSection('about');
        } else {
            showSection(hash);
        }
    };

    window.addEventListener('popstate', handleNavigation);
    handleNavigation();
});