// branches_GN.js - Interactive effects for Ganesh's branches page

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Hero icon enhanced animation
    const heroIcon = document.querySelector('.hero-icon');
    if (heroIcon) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            const float = Math.sin(Date.now() / 1000) * 10;
            const tilt = Math.sin(Date.now() / 2000) * 5;
            heroIcon.style.transform = `translateY(${float}px) rotate(${tilt}deg)`;
        }, 50);
    }
    
    // Stat value counter animation
    const statValue = document.querySelector('.stat-value');
    if (statValue) {
        const targetValue = parseInt(statValue.textContent);
        let currentValue = 0;
        const duration = 1500;
        const increment = targetValue / (duration / 16);
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                statValue.textContent = targetValue;
                clearInterval(counter);
            } else {
                statValue.textContent = Math.floor(currentValue);
            }
        }, 16);
        
        // Hover effect
        statValue.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.textShadow = '0 0 20px rgba(78, 205, 196, 0.6)';
        });
        
        statValue.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = 'none';
        });
    }
    
    // Vendor badge pulse
    const vendorBadge = document.querySelector('.vendor-badge');
    if (vendorBadge) {
        vendorBadge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.4)';
        });
        
        vendorBadge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
    }
    
    // Table row hover effects
    const dataRows = document.querySelectorAll('.data-row');
    dataRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.15)';
            this.style.zIndex = '10';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.zIndex = '1';
        });
    });
    
    // Sort link animations
    const sortLinks = document.querySelectorAll('.sort-link');
    sortLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const sortIcon = this.querySelector('.sort-icon');
            if (sortIcon) {
                sortIcon.style.animation = 'spin 0.5s ease';
                setTimeout(() => {
                    sortIcon.style.animation = '';
                }, 500);
            }
        });
        
        link.addEventListener('mouseenter', function() {
            const sortIcon = this.querySelector('.sort-icon');
            if (sortIcon) {
                sortIcon.style.transform = 'scale(1.3)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const sortIcon = this.querySelector('.sort-icon');
            if (sortIcon) {
                sortIcon.style.transform = 'scale(1)';
            }
        });
    });
    
    // ID badge animations
    const idBadges = document.querySelectorAll('.id-badge');
    idBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(-3deg)';
            this.style.boxShadow = '0 4px 15px rgba(78, 205, 196, 0.4)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Branch icon animations
    const branchIcons = document.querySelectorAll('.branch-icon');
    branchIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(10deg)';
            this.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.4)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Quantity badge hover effect
    const quantityBadges = document.querySelectorAll('.quantity-badge');
    quantityBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.3)';
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
                icon.style.transform = 'translateX(-8px)';
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
    
    // Pagination animations
    const pageBtns = document.querySelectorAll('.page-btn:not(.disabled)');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        btn.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                if (this.classList.contains('prev-btn')) {
                    icon.style.transform = 'translateX(-3px)';
                } else {
                    icon.style.transform = 'translateX(3px)';
                }
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Page numbers animation
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
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
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
    
    // Observe table rows
    dataRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(row);
    });
    
    // Branch name text shimmer effect
    const branchNames = document.querySelectorAll('.branch-name');
    branchNames.forEach((name, index) => {
        setTimeout(() => {
            name.style.animation = 'pulse 0.8s ease-in-out';
            setTimeout(() => {
                name.style.animation = '';
            }, 800);
        }, index * 100);
    });
    
    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .id-badge, .branch-icon, .quantity-badge');
    interactiveElements.forEach(el => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Branch ID hover effect
    const branchIds = document.querySelectorAll('.branch-id');
    branchIds.forEach(id => {
        id.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary)';
            this.style.transform = 'scale(1.1)';
        });
        
        id.addEventListener('mouseleave', function() {
            this.style.color = 'var(--text-primary)';
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log('🎨 Ganesh\'s Branch Summary Page Interactive Effects Loaded - Linear Style!');
});