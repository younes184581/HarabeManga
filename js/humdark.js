// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Set initial state based on screen width
    const isMobile = window.innerWidth <= 768;
    navLinks.style.display = isMobile ? 'none' : 'flex';
    
    // Hamburger menu toggle (mobile only)
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        navLinks.style.display = navLinks.classList.contains('show') ? 'flex' : 'none';
    });

    // Dark mode toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});
