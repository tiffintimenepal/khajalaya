// Legal Documents JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initBackToTopButton();
    initSmoothScrolling();
    initPrintFunctionality();
    initSearchFunctionality();
    initMobileOptimizations();
    initAccessibilityFeatures();
    initAccountDeletionForm();
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

// Account Deletion Form Handler with Web3Forms
function initAccountDeletionForm() {
    const form = document.getElementById('accountDeletionForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                userEmail: formData.get('userEmail'),
                userPhone: formData.get('userPhone'),
                reason: formData.get('reason'),
                additionalInfo: formData.get('additionalInfo'),
                confirmDeletion: formData.get('confirmDeletion'),
                confirmEmail: formData.get('confirmEmail')
            };
            
            // Validate required fields
            if (!data.userEmail || !data.confirmDeletion || !data.confirmEmail) {
                showNotification('Please fill in all required fields and confirmations.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.userEmail)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            const submitButton = form.querySelector('.deletion-submit-btn');
            const originalText = submitButton.innerHTML;
            
            try {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Prepare message for Web3Forms
                const message = `
Account Deletion Request Details:

Email Address: ${data.userEmail}
Phone Number: ${data.userPhone || 'Not provided'}
Reason: ${data.reason || 'Not specified'}
Additional Information: ${data.additionalInfo || 'None'}

Confirmation:
✓ User understands deletion is permanent
✓ User confirms email is associated with account

Request submitted on: ${new Date().toLocaleString()}
Page URL: ${window.location.href}
User Agent: ${navigator.userAgent}

---
This request was submitted through the Khajalaya Privacy Policy page.
Please process this account deletion request within 30 days as per our privacy policy.
                `.trim();
                
                // Add message to form data
                formData.set('message', message);
                
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showSuccessPopup();
                    form.reset();
                } else {
                    showNotification('Failed to submit request. Please try again or contact us directly.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('An error occurred. Please try again.', 'error');
            } finally {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// Show email content for manual copying (fallback)
function showEmailContent(data, subject, body) {
    const modal = document.createElement('div');
    modal.className = 'email-modal';
    modal.innerHTML = `
        <div class="email-modal-content">
            <div class="email-modal-header">
                <h3>📧 Email Content</h3>
                <button class="close-modal" onclick="this.closest('.email-modal').remove()">×</button>
            </div>
            <div class="email-modal-body">
                <p><strong>To:</strong> tiffintimenepal@gmail.com</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div class="email-body">
                    <label>Email Body:</label>
                    <textarea readonly rows="15">${body}</textarea>
                    <button class="copy-btn" onclick="copyToClipboard(this.previousElementSibling)">📋 Copy to Clipboard</button>
                </div>
                <p class="modal-note">Please copy the content above and send it to tiffintimenepal@gmail.com</p>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .email-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .email-modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .email-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .email-modal-header h3 {
            margin: 0;
            color: #1f2937;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
        }
        .email-modal-body {
            padding: 1.5rem;
        }
        .email-modal-body p {
            margin-bottom: 1rem;
            color: #374151;
        }
        .email-body textarea {
            width: 100%;
            height: 200px;
            padding: 1rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-family: monospace;
            font-size: 0.9rem;
            resize: vertical;
        }
        .copy-btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 0.5rem;
        }
        .modal-note {
            background: #f3f4f6;
            padding: 1rem;
            border-radius: 6px;
            margin-top: 1rem;
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
}

// Copy to clipboard function
function copyToClipboard(textarea) {
    textarea.select();
    document.execCommand('copy');
    
    const btn = textarea.nextElementSibling;
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#3b82f6';
    }, 2000);
}

// Success Popup for form submission
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="success-popup-content">
            <div class="success-icon">✅</div>
            <h3>Request Submitted Successfully!</h3>
            <p>Your account deletion request has been submitted successfully.</p>
            <p>You will receive a confirmation email at the address you provided.</p>
            <p>We will process your request within 30 days as per our privacy policy.</p>
            <button class="success-close-btn" onclick="this.closest('.success-popup').remove()">
                <i class="fas fa-check"></i> Got it
            </button>
        </div>
    `;
    
    // Add popup styles
    const style = document.createElement('style');
    style.textContent = `
        .success-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        .success-popup-content {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
        }
        .success-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            color: #10b981;
        }
        .success-popup-content h3 {
            color: #1f2937;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: 700;
        }
        .success-popup-content p {
            color: #6b7280;
            margin-bottom: 0.75rem;
            line-height: 1.6;
        }
        .success-close-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1.5rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: auto;
            margin-right: auto;
        }
        .success-close-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        @media (max-width: 768px) {
            .success-popup-content {
                padding: 1.5rem;
                margin: 1rem;
            }
            .success-icon {
                font-size: 3rem;
            }
            .success-popup-content h3 {
                font-size: 1.25rem;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(popup);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 10000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.closest('.notification').remove()">×</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                max-width: 400px;
                animation: slideIn 0.3s ease-out;
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-info {
                border-left: 4px solid #3b82f6;
            }
            .notification-content {
                display: flex;
                align-items: center;
                padding: 1rem;
                gap: 0.75rem;
            }
            .notification-icon {
                font-size: 1.2rem;
            }
            .notification-message {
                flex: 1;
                color: #374151;
                font-size: 0.9rem;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #6b7280;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Export functions for global access
window.scrollToTop = scrollToTop;
window.searchContent = searchContent;
window.copyToClipboard = copyToClipboard;
