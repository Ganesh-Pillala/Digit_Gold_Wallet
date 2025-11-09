// Vendors Page - Interactive Enhancements

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏪 Vendors Page Loaded');

    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Search input enhancements
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 4px rgba(108, 92, 231, 0.1)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '';
        });

        // Auto-focus on '/' key
        document.addEventListener('keydown', function(e) {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // Add hover effects to vendor links
    const vendorLinks = document.querySelectorAll('.vendor-link');
    vendorLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.vendor-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.vendor-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }
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
        // ESC to clear search
        if (e.key === 'Escape' && searchInput) {
            searchInput.value = '';
            searchInput.blur();
        }
        
        // Backspace to go back (when not in input)
        if (e.key === 'Backspace' && document.activeElement !== searchInput) {
            const backBtn = document.querySelector('.back-btn');
            if (backBtn) {
                e.preventDefault();
                backBtn.click();
            }
        }
    });

    // Add ripple effect on table rows
    const tableRows = document.querySelectorAll('.table-row');
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

    console.log('✨ Page interactions loaded');
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: translate(-50%, -50%) scale(40);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);