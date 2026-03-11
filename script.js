// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Team Members Data
const teamMembers = [
    { name: 'Alex "Blaze"', role: 'Leader', desc: 'Strategy mastermind behind Team X victories.', avatar: 'images/team1.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Jordan "Ghost"', role: 'Sniper', desc: 'One-shot king with ice-cold precision.', avatar: 'images/team2.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Sam "Builder"', role: 'Architect', desc: 'Minecraft god who builds empires overnight.', avatar: 'images/team3.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Riley "Chaos"', role: 'Heist Pro', desc: 'GTA Online criminal mastermind.', avatar: 'images/team4.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Casey "Duelist"', role: 'Valorant Star', desc: 'Entry fragger with perfect aim.', avatar: 'images/team5.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Taylor "Fortnite"', role: 'Battle Royale', desc: 'Victory Royale collector.', avatar: 'images/team6.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Morgan "Roblox"', role: 'Developer', desc: 'Creates insane Roblox experiences.', avatar: 'images/team7.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Jamie "Streamer"', role: 'Content Creator', desc: '24/7 entertainment machine.', avatar: 'images/team8.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Chris "AmongUs"', role: 'Detective', desc: 'Always catches the impostor first.', avatar: 'images/team9.jpg', twitch: '#', youtube: '#', twitter: '#' },
    { name: 'Pat "Tech"', role: 'Hardware Expert', desc: 'PC building wizard and tech support.', avatar: 'images/team10.jpg', twitch: '#', youtube: '#', twitter: '#' }
];

// Populate team page
if (document.getElementById('team-grid')) {
    const teamGrid = document.getElementById('team-grid');
    teamMembers.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${member.avatar}" alt="${member.name}" class="team-avatar">
            <h3 class="team-name">${member.name}</h3>
            <div class="team-role">${member.role}</div>
            <p class="team-desc">${member.desc}</p>
            <div class="social-links">
                <a href="${member.twitch}" target="_blank"><i class="fab fa-twitch"></i></a>
                <a href="${member.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>
                <a href="${member.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
        `;
        teamGrid.appendChild(card);
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message })
            });
            
            if (response.ok) {
                alert('Message sent successfully! We\'ll get back to you soon.');
                contactForm.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.team-card, .game-card, .social-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
