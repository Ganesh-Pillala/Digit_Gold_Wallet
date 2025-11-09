// Transactions Page - Interactive Enhancements

document.addEventListener('DOMContentLoaded', function() {
    console.log('📃 Transactions Page Loaded');

    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Get current sort parameters
    const urlParams = new URLSearchParams(window.location.search);
    const currentSort = urlParams.get('sortBy');
    const currentOrder = urlParams.get('sortOrder');

    // Highlight active sort column
    const sortLinks = document.querySelectorAll('.sort-link');
    sortLinks.forEach(link => {
        const sortIcon = link.querySelector('.sort-icon');
        
        link.addEventListener('mouseenter', function() {
            this.parentElement.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!sortIcon.classList.contains('active')) {
                this.parentElement.style.background = '';
            }
        });
    });

    // Add loading animation on sort click
    sortLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const table = document.querySelector('.modern-table');
            if (table) {
                table.style.opacity = '0.5';
                table.style.transform = 'scale(0.98)';
                table.style.transition = 'all 0.3s ease';
            }
            
            // Show loading indicator
            const loader = document.createElement('div');
            loader.className = 'loading-indicator';
            loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sorting...';
            document.querySelector('.table-section').appendChild(loader);
        });
    });

    // Parallax orbs on mouse move
    document.addEventListener('mousemove', function(e) {
        const orbs = document.querySelectorAll('.orb');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 25;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Smooth scroll for pagination
    const paginationBtns = document.querySelectorAll('.pagination-btn, .page-number');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.classList.contains('disabled') && !this.classList.contains('active')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Add loading state
                document.body.style.opacity = '0.8';
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 300);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Backspace or B to go back
        if (e.key === 'Backspace' || e.key === 'b' || e.key === 'B') {
            const backBtn = document.querySelector('.back-btn');
            if (backBtn && document.activeElement.tagName !== 'INPUT') {
                e.preventDefault();
                backBtn.click();
            }
        }
        
        // Arrow keys for pagination
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.querySelector('.pagination-btn:not(.disabled) i.fa-chevron-left');
            if (prevBtn) prevBtn.closest('a').click();
        }
        
        if (e.key === 'ArrowRight') {
            const nextBtn = document.querySelector('.pagination-btn:not(.disabled) i.fa-chevron-right');
            if (nextBtn) nextBtn.closest('a').click();
        }
    });

    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach((row, index) => {
        row.addEventListener('mouseenter', function() {
            // Fade adjacent rows slightly
            const prevRow = this.previousElementSibling;
            const nextRow = this.nextElementSibling;
            
            if (prevRow && prevRow.classList.contains('table-row')) {
                prevRow.style.opacity = '0.6';
            }
            if (nextRow && nextRow.classList.contains('table-row')) {
                nextRow.style.opacity = '0.6';
            }
        });
        
        row.addEventListener('mouseleave', function() {
            const prevRow = this.previousElementSibling;
            const nextRow = this.nextElementSibling;
            
            if (prevRow && prevRow.classList.contains('table-row')) {
                prevRow.style.opacity = '1';
            }
            if (nextRow && nextRow.classList.contains('table-row')) {
                nextRow.style.opacity = '1';
            }
        });
    });

    // Add ripple effect on table rows
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = row.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba(108, 92, 231, 0.5);
                transform: translate(-50%, -50%) scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
            `;
            
            row.style.position = 'relative';
            row.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Animate quantity badges on hover
    const quantityBadges = document.querySelectorAll('.quantity-badge');
    quantityBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    console.log('✨ Page interactions loaded');
});

// Add ripple and loading animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: translate(-50%, -50%) scale(40);
            opacity: 0;
        }
    }
    
    .loading-indicator {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 1.5rem 2.5rem;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        font-weight: 700;
        color: var(--primary);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }
    
    .loading-indicator i {
        font-size: 1.5rem;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);