// payments_AB.js - Interactive effects for Abdullah's payments page

document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Info cards hover effects
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            const icon = this.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Table row hover effects
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Status badge pulse effect
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        badge.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Sorting animation
    const sortLinks = document.querySelectorAll('.sort-link');
    sortLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const icon = this.querySelector('.sort-icon');
            if (icon) {
                icon.style.animation = 'rotate-icon 0.5s ease';
            }
        });
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes rotate-icon {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(180deg); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-8px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(-4px); }
        }
        
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
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
    `;
    document.head.appendChild(style);
    
    // Ripple effect function
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
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Apply ripple to buttons
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(.disabled)');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    // ID badge hover effect
    const idBadges = document.querySelectorAll('.id-badge');
    idBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(-5deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Amount value highlight effect
    const amountValues = document.querySelectorAll('.amount-value');
    amountValues.forEach(amount => {
        amount.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary)';
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        amount.addEventListener('mouseleave', function() {
            this.style.color = 'var(--dark-gray)';
            this.style.transform = 'scale(1)';
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
    
    // Method icon bounce
    const methodIcons = document.querySelectorAll('.method-icon');
    methodIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Date cell hover effect
    const dateCells = document.querySelectorAll('.date-cell');
    dateCells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'pulse 0.6s ease-in-out';
            }
        });
    });
    
    // Back button arrow animation
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(-8px)';
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
    
    // Highlight card pulse animation
    const highlightCard = document.querySelector('.highlight-card');
    if (highlightCard) {
        setInterval(() => {
            const icon = highlightCard.querySelector('.info-icon');
            if (icon) {
                icon.style.animation = 'pulse 1.5s ease-in-out';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 1500);
            }
        }, 3000);
    }
    
    // Table header sort icon animation
    sortLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const sortIcon = this.querySelector('.sort-icon');
            if (sortIcon) {
                sortIcon.style.transform = 'scale(1.3)';
                sortIcon.style.transition = 'transform 0.3s ease';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const sortIcon = this.querySelector('.sort-icon');
            if (sortIcon) {
                sortIcon.style.transform = 'scale(1)';
            }
        });
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
    
    // Add shimmer effect to amounts on load
    amountValues.forEach((amount, index) => {
        setTimeout(() => {
            amount.style.animation = 'pulse 0.8s ease-in-out';
            setTimeout(() => {
                amount.style.animation = '';
            }, 800);
        }, index * 100);
    });
    
    // Status badge icon rotation
    statusBadges.forEach(badge => {
        const icon = badge.querySelector('i');
        if (icon) {
            badge.addEventListener('mouseenter', function() {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            });
            
            badge.addEventListener('mouseleave', function() {
                icon.style.transform = 'rotate(0deg)';
            });
        }
    });
    
    // Pagination button hover effects
    paginationBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('disabled')) {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.3)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Page number buttons pulse
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
    
    // Calculate total payment amount animation
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = progress * (end - start) + start;
            element.textContent = '$' + value.toFixed(2);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Animate balance on page load
    const balanceValue = document.querySelector('.highlight-card .info-value span');
    if (balanceValue) {
        const targetValue = parseFloat(balanceValue.textContent.replace(/,/g, ''));
        balanceValue.textContent = '0.00';
        setTimeout(() => {
            animateValue(balanceValue, 0, targetValue, 2000);
        }, 500);
    }
    
    console.log('🌿 Abdullah\'s Payment Page Interactive Effects Loaded!');
});