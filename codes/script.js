// Typing text animation
const typingText = document.getElementById('typing-text');
const words = ["Developer", "Designer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    typingText.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 800);
    }
}
type();

// Scroll-triggered fade-in animations
const sections = document.querySelectorAll('.content-section');
function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < triggerBottom) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
revealSections();

// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// Animated background particles
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Skill info hover box
const skillItems = document.querySelectorAll('.skill-item');
const skillInfoBox = document.getElementById('skill-info-box');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        skillInfoBox.textContent = item.getAttribute('data-info');
    });
    item.addEventListener('mouseleave', () => {
        skillInfoBox.textContent = "Hover over a skill to learn more!";
    });
});

// Back-to-top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// vCard download
document.querySelector('.vcard-btn').addEventListener('click', () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:Avenash.v
TEL:+91 94453 71134
EMAIL:avenashjojo005@gmail.com
END:VCARD
    `;
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Avenash.vcf';
    link.click();
});
// Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('nav ul');
const overlay = document.getElementById('overlay');

// Toggle menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('showing');
    menuToggle.classList.toggle('active');
    overlay.classList.toggle('show');
});

// Close menu on link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking overlay
overlay.addEventListener('click', closeMenu);

function closeMenu() {
    navMenu.classList.remove('showing');
    menuToggle.classList.remove('active');
    overlay.classList.remove('show');
}

// Swipe to close
let startX = 0;
navMenu.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
navMenu.addEventListener('touchmove', (e) => {
    const endX = e.touches[0].clientX;
    if (startX - endX > 50) {
        closeMenu();
    }
});
