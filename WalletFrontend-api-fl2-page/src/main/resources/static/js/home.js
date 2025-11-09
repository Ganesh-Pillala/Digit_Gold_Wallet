// Digital Gold Wallet - Interactive Landing Page

document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ Digital Gold Wallet Loaded');

    // Smooth parallax scrolling
    let scrollPosition = 0;
    window.addEventListener('scroll', function() {
        scrollPosition = window.pageYOffset;
        
        // Parallax effect on orbs
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            orb.style.transform = `translateY(${scrollPosition * speed}px)`;
        });

        // Fade hero on scroll
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const opacity = 1 - (scrollPosition / window.innerHeight);
            hero.style.opacity = Math.max(opacity, 0);
        }
    });

    // Mouse parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move orbs with mouse
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 30;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Tilt cards on hover
        const cards = document.querySelectorAll('.team-member-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - cardCenterX;
            const distanceY = e.clientY - cardCenterY;
            
            if (Math.abs(distanceX) < rect.width && Math.abs(distanceY) < rect.height) {
                const rotateX = (distanceY / rect.height) * 10;
                const rotateY = (distanceX / rect.width) * -10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
            } else {
                card.style.transform = '';
            }
        });
    });

    // Add ripple effect to cards
    const cards = document.querySelectorAll('.team-member-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(255, 215, 0, 0.6);
                transform: translate(-50%, -50%) scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                z-index: 100;
            `;
            
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const teamSection = document.querySelector('.team-section');
            teamSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe team cards
    const teamCards = document.querySelectorAll('.team-member-card');
    teamCards.forEach(card => {
        observer.observe(card);
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                if (text === '∞') {
                    // Infinity symbol animation
                    let scale = 1;
                    const interval = setInterval(() => {
                        scale = scale === 1 ? 1.2 : 1;
                        target.style.transform = `scale(${scale})`;
                    }, 500);
                    
                    setTimeout(() => clearInterval(interval), 3000);
                } else if (text.includes('%')) {
                    // Percentage animation
                    const num = parseInt(text);
                    let current = 0;
                    const increment = num / 50;
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            target.textContent = num + '%';
                            clearInterval(interval);
                        } else {
                            target.textContent = Math.floor(current) + '%';
                        }
                    }, 20);
                } else {
                    // Number animation
                    const num = parseInt(text);
                    let current = 0;
                    const increment = num / 30;
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            target.textContent = num;
                            clearInterval(interval);
                        } else {
                            target.textContent = Math.floor(current);
                        }
                    }, 30);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // Gold icon floating animation variation
    const goldIcon = document.querySelector('.gold-icon');
    if (goldIcon) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = goldIcon.style.transform || 'translateY(0px)';
            const currentY = parseInt(currentTransform.match(/-?\d+/) || 0);
            
            if (Math.abs(currentY) > 20) {
                floatDirection *= -1;
            }
            
            const newY = currentY + (floatDirection * 0.5);
            goldIcon.style.transform = `translateY(${newY}px)`;
        }, 50);
    }

    // Add magnetic effect to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.2s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = '';
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press Space or Down Arrow to scroll to team section
        if (e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            const teamSection = document.querySelector('.team-section');
            if (window.pageYOffset < teamSection.offsetTop) {
                teamSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Press Home to scroll to top
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Add sparkle effect on card hover
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.style.cssText = `
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background: var(--gold);
                        border-radius: 50%;
                        pointer-events: none;
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        animation: sparkle-fade 1s ease-out forwards;
                        z-index: 10;
                    `;
                    card.appendChild(sparkle);
                    setTimeout(() => sparkle.remove(), 1000);
                }, i * 100);
            }
        });
    });

    // Console Easter Egg
    console.log('%c✨ Digital Gold Wallet ✨', 'font-size: 20px; color: #FFD700; font-weight: bold;');
    console.log('%cBuilt with 💛 by an amazing team', 'font-size: 14px; color: #4ECDC4;');
});

// Dynamic CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: translate(-50%, -50%) scale(30);
            opacity: 0;
        }
    }
    
    @keyframes sparkle-fade {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(1) translateY(-30px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);