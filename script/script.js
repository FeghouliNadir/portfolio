function initializeScrollReveal() {
    ScrollReveal().reveal('[data-sr="left"]', {
        delay: 200,
        duration: 1000,
        distance: '80px',
        origin: 'left', // Set the origin to "left"
        reset: true, // Reset the animation on each view
        scale: 1,
        mobile: false, // Disable on mobile devices if needed
    });

    ScrollReveal().reveal('[data-sr="right"]', {
        delay: 200,
        duration: 1000,
        distance: '80px',
        origin: 'right', // Set the origin to "left"
        reset: true, // Reset the animation on each view
        scale: 1,
        mobile: false, // Disable on mobile devices if needed
    });

    ScrollReveal().reveal('[data-sr="bottom"]', {
        delay: 200,
        duration: 1000,
        distance: '80px',
        origin: 'bottom', // Set the origin to "left"
        reset: true, // Reset the animation on each view
        scale: 1,
        mobile: false, // Disable on mobile devices if needed
    });

    ScrollReveal().reveal('[data-sr="top"]', {
        delay: 200,
        duration: 1000,
        distance: '80px',
        origin: 'top', // Set the origin to "left"
        reset: true, // Reset the animation on each view
        scale: 1,
        mobile: false, // Disable on mobile devices if needed
    });
}

function scrollToContact() {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Function to initialize Typed.js
function initializeTypedText() {
    const typedText = new Typed("#typed-text", {
        strings: ["Nadir", "Abdulrahman", "Abubakr", "Sadiek"], // You can add more strings if needed
        typeSpeed: 50, // Adjust the typing speed
        backSpeed: 25, // Adjust the backspacing speed
        startDelay: 100, // Delay before typing starts
        backDelay: 1000, // Delay before backspacing
        showCursor: true, // Show the typing cursor
        cursorChar: "|", // Typing cursor character
        loop: true, // Loop the typing animation
    });
}
// Event listener for page load
window.addEventListener("load", () => {
    // Initialize Typed.js after the page content is loaded
    initializeTypedText();
    // Initialize ScrollReveal after the page content is loaded
    initializeScrollReveal();
});

function toggleDarkMode() {
    const body = document.body;
    const home = document.getElementById("home");
    body.classList.toggle("dark-mode");
    home.classList.toggle("dark-mode");
}

// Event listener for dark mode button click
const darkModeButton = document.getElementById("dark-mode-button");
darkModeButton.addEventListener("click", toggleDarkMode);

function myMenuFunction() {
    const navMenu = document.querySelector('.nav-menu');
    const hamMenu = document.querySelector('.ham-menu');

    if (navMenu.classList.contains('responsive')) {
        navMenu.classList.remove('responsive');
        // Remove the 'active' class from the hamburger menu when the menu is closed
        hamMenu.classList.remove('active');
    } else {
        navMenu.classList.add('responsive');
        // Add the 'active' class to the hamburger menu when the menu is opened
        hamMenu.classList.add('active');
    }
}

// Function to handle the scroll event and apply header shadow
function headerShadow() {
    const navHeader = document.getElementById("header");
    const hamMenu = document.querySelector('.ham-menu');

    // Check if the mobile menu is not active (hamburger menu is not active)
    if (!hamMenu.classList.contains('active')) {
        if (window.scrollY > 50) {
            navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
            navHeader.style.height = "70px";
            navHeader.style.lineHeight = "70px";
        } else {
            navHeader.style.boxShadow = "none";
            navHeader.style.height = "90px";
            navHeader.style.lineHeight = "90px";
        }
    }
}

// Add an event listener for the scroll event
window.addEventListener("scroll", headerShadow);

// Add an event listener for window resize to handle responsiveness
window.addEventListener("resize", () => {
    // Call headerShadow on window resize to handle responsiveness
    headerShadow();
});

function updateActiveLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 90 && rect.bottom >= 90) { // Adjust 90 according to your header height
            navLinks.forEach((link) => link.classList.remove('active-link'));
            navLinks[index].classList.add('active-link');
        }
    });
}

// Add scroll event listener to update active link on scroll
window.addEventListener('scroll', updateActiveLink);

// Call the function on page load to set the initial active link
updateActiveLink();