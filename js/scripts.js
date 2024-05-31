document.addEventListener('DOMContentLoaded', () => {
    // Initially hide all sections except the "About Me" section
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'about') {
            section.classList.add('hidden');
        }
    });

    // Navigation links click event to show respective sections
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.querySelectorAll('section').forEach(section => {
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });
});
