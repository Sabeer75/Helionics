document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for Stats Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelector('.safety-stats').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.safety-stats').style.opacity = '1';
        observer.observe(document.querySelector('.safety-stats'));
    }, 500);

    // Pre-order Modal Functionality
    const preorderButton = document.querySelector('.btn.btn-primary[href="#"]');
    const modal = document.getElementById('preorder-modal');
    const closeModal = document.getElementById('close-modal');
    const preorderForm = document.getElementById('preorder-form');
    const quantityInput = document.getElementById('quantity');
    const totalAmount = document.getElementById('total-amount');
    const confirmOrderButton = document.getElementById('confirm-order');
    const orderConfirmation = document.getElementById('order-confirmation');

    preorderButton.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        orderConfirmation.style.display = 'none';
    });

    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 1;
        totalAmount.textContent = quantity * 2500;
    });

    confirmOrderButton.addEventListener('click', () => {
        orderConfirmation.style.display = 'block';
    });
});