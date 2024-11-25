document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav__link');

    // navLinks.forEach(link => {
    //     link.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         const targetId = link.getAttribute('href').substring(1);
            
    //         // Special handling for CV link
    //         if (targetId === 'cv') {
    //             window.open('./files/cv_US.pdf', '_blank', 'noopener,noreferrer');
    //             return;
    //         }
            
    //         // Smooth scroll to target section
    //         const targetSection = document.getElementById(targetId);
    //         if (targetSection) {
    //             // Get the height of the fixed navigation bar
    //             const navHeight = document.querySelector('.nav').offsetHeight;
                
    //             // Calculate the final scroll position, accounting for the nav bar
    //             const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
    //             window.scrollTo({
    //                 top: targetPosition,
    //                 behavior: 'smooth'
    //             });
                
    //             // Update URL without scrolling
    //             history.pushState(null, '', `#${targetId}`);
    //         }
    //     });
    // });
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Existing CV handling
            if (targetId === 'cv') {
                window.open('./files/cv_US.pdf', '_blank', 'noopener,noreferrer');
                return;
            }
            
            // Smooth scroll to target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, '', `#${targetId}`);
            }
        });
    });


    // Handle initial load and browser navigation
    const handleNavigation = () => {
        const hash = location.hash.substring(1);
        if (hash === 'cv') {
            window.open('./files/cv_US.pdf', '_blank', 'noopener,noreferrer');
            history.pushState(null, '', '#about');
        } else if (hash) {
            // Smooth scroll to the section after page load
            setTimeout(() => {
                const targetSection = document.getElementById(hash);
                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    window.addEventListener('popstate', handleNavigation);
    handleNavigation();
});