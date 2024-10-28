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

    function loadCV() {
        const cvContainer = document.querySelector('.cv-container');
        const iframe = document.createElement('iframe');
        iframe.src = '/files/cv_US.pdf';
        iframe.style.width = '100%';
        iframe.style.height = '800px';
        iframe.style.border = '1px solid #ccc';
        cvContainer.innerHTML = '';
        cvContainer.appendChild(iframe);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            if (targetId === 'cv') {
                loadCV();
            }
            
            showSection(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    // Handle initial load and browser navigation
    const handleNavigation = () => {
        const hash = location.hash.substring(1) || 'about';
        showSection(hash);
        if (hash === 'cv') {
            loadCV();
        }
    };

    window.addEventListener('popstate', handleNavigation);
    handleNavigation();
});