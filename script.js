// Set default dates for check-in and check-out
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        checkinInput.value = today.toISOString().split('T')[0];
        checkoutInput.value = tomorrow.toISOString().split('T')[0];
        
        // Set minimum date to today
        checkinInput.min = today.toISOString().split('T')[0];
        checkoutInput.min = tomorrow.toISOString().split('T')[0];
        
        // Update checkout min date when checkin changes
        checkinInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.min = nextDay.toISOString().split('T')[0];
            
            if (checkoutInput.value <= this.value) {
                checkoutInput.value = nextDay.toISOString().split('T')[0];
            }
        });
    }
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Property card favorite toggle
document.querySelectorAll('.property-favorite').forEach(favorite => {
    favorite.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = favorite.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#FF385C';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '#333';
        }
    });
});

// Search functionality
document.querySelector('.search-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    const destination = document.querySelector('.search-field input[type="text"]').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.querySelector('.search-field select').value;
    
    if (!destination.trim()) {
        alert('Please enter a destination');
        return;
    }
    
    if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates');
        return;
    }
    
    // Simulate search (in a real app, this would make an API call)
    console.log('Searching for:', {
        destination,
        checkin,
        checkout,
        guests
    });
    
    // Show loading state
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-search"></i>';
        alert(`Searching for accommodations in ${destination} from ${checkin} to ${checkout} for ${guests}`);
    }, 1500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Property card click handler
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.property-favorite')) {
            const title = this.querySelector('.property-title').textContent;
            const location = this.querySelector('.property-location').textContent;
            const price = this.querySelector('.property-price').textContent;
            
            // In a real app, this would navigate to property details page
            console.log('Property clicked:', { title, location, price });
            alert(`You clicked on: ${title} in ${location}\nPrice: ${price}`);
        }
    });
});

// Mobile menu toggle (for future implementation)
document.querySelector('.user-menu').addEventListener('click', function() {
    // This would toggle a mobile menu in a full implementation
    console.log('User menu clicked');
});

// Form validation for search inputs
function validateSearchForm() {
    const destination = document.querySelector('.search-field input[type="text"]');
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    
    // Add real-time validation
    destination.addEventListener('input', function() {
        if (this.value.length > 0) {
            this.style.borderColor = '#4CAF50';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
    
    checkin.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = '#4CAF50';
        }
    });
    
    checkout.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = '#4CAF50';
        }
    });
}

// Initialize form validation
validateSearchForm();

// Add loading animation for property images
document.querySelectorAll('.property-image img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/400x250/f0f0f0/666?text=Image+Not+Available';
    });
});

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.property-card, .feature-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effects for better UX
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Currency formatter for prices
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(price);
}

// Update prices with proper formatting (if needed)
document.querySelectorAll('.property-price').forEach(priceEl => {
    const priceText = priceEl.textContent;
    const priceMatch = priceText.match(/₹([\d,]+)/);
    if (priceMatch) {
        const price = parseInt(priceMatch[1].replace(/,/g, ''));
        const formattedPrice = formatPrice(price);
        priceEl.innerHTML = priceEl.innerHTML.replace(/₹[\d,]+/, formattedPrice);
    }
});

console.log('Aha Hotel Booking App initialized successfully!');