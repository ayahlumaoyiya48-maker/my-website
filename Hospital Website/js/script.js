// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
   
    setActiveNav();
    
    
    setupForms();
});


function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


function setupForms() {
    const acquisitionForm = document.getElementById('acquisition-form');
    const serviceDeskForm = document.getElementById('service-desk-form');
    
    if (acquisitionForm) {
        acquisitionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAcquisitionSubmit(this);
        });
    }
    
    if (serviceDeskForm) {
        serviceDeskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceDeskSubmit(this);
        });
    }
}

// Handle acquisition form submission
function handleAcquisitionSubmit(form) {
    const formData = new FormData(form);
    const requestData = {
        type: formData.get('request-type'),
        description: formData.get('description'),
        urgency: formData.get('urgency'),
        justification: formData.get('justification')
    };
    
    // Simulate form submission
    showNotification('Your equipment request has been submitted successfully! A confirmation email has been sent.', 'success');
    form.reset();
    
    console.log('Acquisition Request:', requestData);
}

// Handle service desk form submission
function handleServiceDeskSubmit(form) {
    const formData = new FormData(form);
    const ticketData = {
        name: formData.get('name'),
        department: formData.get('department'),
        contact: formData.get('contact'),
        issueType: formData.get('issue-type'),
        priority: formData.get('priority'),
        description: formData.get('description'),
        assetNumber: formData.get('asset-number')
    };
    
    // Generate ticket number
    const ticketNumber = 'INC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    
    // Simulate form submission
    showNotification(`Ticket ${ticketNumber} created successfully! Our team will contact you shortly.`, 'success');
    form.reset();
    
    console.log('Service Desk Ticket:', ticketData);
}

// Show notification message
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : '#0c5460'};
        padding: 1rem;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        max-width: 400px;
        border-left: 4px solid ${type === 'success' ? '#28a745' : '#17a2b8'};
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin: 0;
    `;
    
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Emergency contact expansion
function toggleEmergencyContacts() {
    const contacts = document.getElementById('emergency-contacts');
    if (contacts) {
        contacts.style.display = contacts.style.display === 'none' ? 'block' : 'none';
    }
}

// Asset lookup function
function searchAsset() {
    const searchTerm = document.getElementById('asset-search')?.value;
    if (searchTerm) {
        // Simulate asset search
        showNotification(`Searching for asset: ${searchTerm}...`, 'info');
        console.log('Asset search:', searchTerm);
    }
}