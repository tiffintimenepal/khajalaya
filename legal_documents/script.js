// Legal Documents JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initBackToTopButton();
    initSmoothScrolling();
    initPrintFunctionality();
    initSearchFunctionality();
    initMobileOptimizations();
    initAccessibilityFeatures();
});

// Back to top button functionality
function initBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }
}

// Smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Print functionality
function initPrintFunctionality() {
    // Add print button if not exists
    const header = document.querySelector('.header');
    if (header && !document.querySelector('.print-button')) {
        const printButton = document.createElement('button');
        printButton.className = 'nav-button print-button';
        printButton.innerHTML = '🖨️ Print';
        printButton.onclick = function() {
            window.print();
        };
        
        const navigation = document.querySelector('.navigation');
        if (navigation) {
            navigation.appendChild(printButton);
        }
    }
}

// Search functionality for content
function initSearchFunctionality() {
    // Add search input if not exists
    if (!document.querySelector('.search-container')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div style="margin: 20px 0; text-align: center;">
                <input type="text" id="searchInput" placeholder="Search content..." 
                       style="padding: 10px; border: 2px solid #667eea; border-radius: 25px; width: 300px; max-width: 100%;">
                <button onclick="searchContent()" style="margin-left: 10px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 25px; cursor: pointer;">Search</button>
            </div>
        `;
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(searchContainer, container.querySelector('.content'));
        }
    }
}

// Search content function
function searchContent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            section.style.backgroundColor = '#fff3cd';
            section.style.border = '2px solid #ffc107';
            section.style.borderRadius = '5px';
            section.style.padding = '15px';
            section.style.margin = '10px 0';
            
            // Scroll to first match
            if (searchTerm && !document.querySelector('.search-highlighted')) {
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                section.classList.add('search-highlighted');
            }
        } else {
            section.style.backgroundColor = '';
            section.style.border = '';
            section.style.borderRadius = '';
            section.style.padding = '';
            section.style.margin = '';
        }
    });
    
    // Clear search
    if (!searchTerm) {
        document.querySelectorAll('.search-highlighted').forEach(el => {
            el.classList.remove('search-highlighted');
        });
    }
}

// Mobile optimizations
function initMobileOptimizations() {
    // Add mobile menu toggle
    if (window.innerWidth <= 768) {
        const navigation = document.querySelector('.navigation');
        if (navigation) {
            navigation.style.position = 'static';
            navigation.style.textAlign = 'center';
            navigation.style.marginBottom = '20px';
        }
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate layout after orientation change
            initMobileOptimizations();
        }, 100);
    });
}

// Accessibility features
function initAccessibilityFeatures() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to clear search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
                searchContent();
            }
        }
        
        // Ctrl+F for search focus
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
    
    // Add ARIA labels and roles
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.setAttribute('role', 'region');
        section.setAttribute('aria-labelledby', `section-${index}`);
        
        const heading = section.querySelector('h2, h3');
        if (heading) {
            heading.id = `section-${index}`;
        }
    });
}

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function updateLastModified() {
    const lastUpdatedElements = document.querySelectorAll('.last-updated strong');
    lastUpdatedElements.forEach(element => {
        if (element.textContent.includes('Last Updated:')) {
            element.textContent = 'Last Updated: ' + formatDate(new Date());
        }
    });
}

// Auto-update last modified date
updateLastModified();

// Add loading animation
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading show';
    loadingDiv.innerHTML = '<div class="spinner"></div><p>Loading...</p>';
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Handle page load
window.addEventListener('load', function() {
    hideLoading();
    
    // Add fade-in animation
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(function() {
            container.style.opacity = '1';
        }, 100);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could add user-friendly error messages here
});

// Service Worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.scrollToTop = scrollToTop;
window.searchContent = searchContent;
