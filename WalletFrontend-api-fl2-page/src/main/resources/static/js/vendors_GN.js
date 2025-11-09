// vendors_GN.js - Interactive effects for Ganesh's vendor page

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Hero icon float animation enhancement
    const heroIcon = document.querySelector('.hero-icon');
    if (heroIcon) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            heroIcon.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10}px) rotate(${rotation}deg)`;
        }, 50);
    }
    
    // Search input animations
    const searchInput = document.querySelector('.search-input');
    const searchWrapper = document.querySelector('.search-wrapper');
    
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            searchWrapper.style.transform = 'translateY(-2px)';
            searchWrapper.style.boxShadow = '0 12px 30px rgba(255, 107, 107, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchWrapper.style.transform = 'translateY(0)';
            searchWrapper.style.boxShadow = 'none';
        });
        
        // Typing animation
        let typingTimer;
        searchInput.addEventListener('input', function() {
            clearTimeout(typingTimer);
            searchWrapper.style.borderColor = 'var(--primary-light)';
            typingTimer = setTimeout(() => {
                searchWrapper.style.borderColor = 'var(--primary)';
            }, 500);
        });
    }
    
    // Table row hover effects
    const dataRows = document.querySelectorAll('.data-row');
    dataRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.15)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Vendor link animations
    const vendorLinks = document.querySelectorAll('.vendor-link');
    vendorLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.vendor-avatar');
            if (avatar) {
                avatar.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.4)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.vendor-avatar');
            if (avatar) {
                avatar.style.boxShadow = 'none';
            }
        });
    });
    
    // ID badge pulse on hover
    const idBadges = document.querySelectorAll('.id-badge');
    idBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 4px 15px rgba(78, 205, 196, 0.4)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Navigation brand hover effect
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(-5px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        navBrand.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Pagination button effects
    const pageBtns = document.querySelectorAll('.page-btn:not(.disabled)');
    pageBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Page number animations
    const pageNums = document.querySelectorAll('.page-num');
    pageNums.forEach(num => {
        num.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // Email cell hover effect
    const emailCells = document.querySelectorAll('.email-cell');
    emailCells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        cell.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Search button ripple effect
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Table badge pulse animation
    const tableBadge = document.querySelector('.table-badge');
    if (tableBadge) {
        setInterval(() => {
            tableBadge.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                tableBadge.style.animation = '';
            }, 1000);
        }, 5000);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K focuses search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
    
    // Intersection Observer for lazy animations
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
    
    // Observe table rows for scroll animations
    dataRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(row);
    });
    
    // Add smooth hover transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .id-badge, .vendor-avatar');
    interactiveElements.forEach(el => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Nav value counter animation
    const navValue = document.querySelector('.nav-value');
    if (navValue) {
        navValue.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
            this.style.textShadow = '0 0 20px rgba(255, 107, 107, 0.5)';
        });
        
        navValue.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = 'none';
        });
    }
    
    console.log('🎨 Ganesh\'s Vendor Page Interactive Effects Loaded - Linear Style!');
});