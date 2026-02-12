const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');

function updateClock() {
    const now = new Date();
    
    // Time
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = String(hours).padStart(2, '0');

    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);
}

// Theme Logic
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggleIcon.classList.replace('ph-sun', 'ph-moon');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (isDark) {
        toggleIcon.classList.replace('ph-sun', 'ph-moon');
    } else {
        toggleIcon.classList.replace('ph-moon', 'ph-sun');
    }
});

// Initial call and interval
updateClock();
setInterval(updateClock, 1000);
