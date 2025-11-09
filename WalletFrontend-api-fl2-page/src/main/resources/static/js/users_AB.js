// users_AB.js - Interactive effects for Abdullah's user page

document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Search input focus effects
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
    
    // Table row hover effects with scale
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // User avatar rotation on hover
    const userLinks = document.querySelectorAll('.user-link');
    userLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.user-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.user-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Pagination button effects
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(.disabled)');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // Page number buttons pulse effect
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.animation = 'pulse 0.6s ease-in-out';
            }
        });
        
        btn.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .search-submit, .pagination-btn, .page-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
    
    // Apply ripple effect to interactive elements
    const submitBtn = document.querySelector('.search-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', createRipple);
    }
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    // Stats badge animation
    const statsBadge = document.querySelector('.stats-badge');
    if (statsBadge) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'pulse 1s ease-in-out';
                    setTimeout(() => {
                        entry.target.style.animation = '';
                    }, 1000);
                }
            });
        });
        observer.observe(statsBadge);
    }
    
    // ID badge hover effect
    const idBadges = document.querySelectorAll('.id-badge');
    idBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(-5deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Icon circle animation on header
    const iconCircle = document.querySelector('.icon-circle');
    if (iconCircle) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            iconCircle.style.transform = `scale(1) rotate(${rotation}deg)`;
        }, 50);
    }
    
    // Email icon bounce on hover
    const emailIcons = document.querySelectorAll('.email-icon');
    emailIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add bounce animation
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-5px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(-3px); }
        }
    `;
    document.head.appendChild(bounceStyle);
    
    // Back button arrow animation
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(-5px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        backBtn.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Search icon pulse animation
    const searchIcon = document.querySelector('.search-icon-wrapper i');
    if (searchIcon) {
        setInterval(() => {
            searchIcon.style.animation = 'pulse 2s ease-in-out';
            setTimeout(() => {
                searchIcon.style.animation = '';
            }, 2000);
        }, 5000);
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F focuses search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f' && searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // Lazy loading animation for table rows
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const rowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    tableRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        rowObserver.observe(row);
    });
    
    console.log('🌿 Abdullah\'s User Page Interactive Effects Loaded!');
});