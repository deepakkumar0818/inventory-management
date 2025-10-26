// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Process tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Demo functionality
document.addEventListener('DOMContentLoaded', function() {
    const demoButtons = document.querySelectorAll('.demo-button');
    const demoContent = document.getElementById('demo-content');

    const demoData = {
        purchase: {
            title: 'Purchase Process Demo',
            steps: [
                { icon: 'fas fa-user-tie', text: 'Vendor setup and management', status: 'completed' },
                { icon: 'fas fa-shopping-bag', text: 'Create purchase order', status: 'completed' },
                { icon: 'fas fa-truck', text: 'Process purchase receive', status: 'in-progress' },
                { icon: 'fas fa-file-invoice', text: 'Process vendor bill', status: 'pending' },
                { icon: 'fas fa-credit-card', text: 'Record payment made', status: 'pending' }
            ]
        },
        sales: {
            title: 'Sales Process Demo',
            steps: [
                { icon: 'fas fa-users', text: 'Customer setup', status: 'completed' },
                { icon: 'fas fa-shopping-cart', text: 'Create sales order', status: 'completed' },
                { icon: 'fas fa-file-invoice-dollar', text: 'Generate invoice', status: 'in-progress' },
                { icon: 'fas fa-receipt', text: 'Process sales receipt', status: 'pending' },
                { icon: 'fas fa-money-bill-wave', text: 'Record payment received', status: 'pending' }
            ]
        },
        fulfillment: {
            title: 'Fulfillment Process Demo',
            steps: [
                { icon: 'fas fa-list', text: 'Generate picklist', status: 'completed' },
                { icon: 'fas fa-hand-paper', text: 'Pick items from warehouse', status: 'completed' },
                { icon: 'fas fa-box', text: 'Package items', status: 'in-progress' },
                { icon: 'fas fa-shipping-fast', text: 'Process shipment', status: 'pending' },
                { icon: 'fas fa-exchange-alt', text: 'Handle transfer orders', status: 'pending' }
            ]
        }
    };

    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const demoType = this.getAttribute('data-demo');
            const demo = demoData[demoType];

            // Remove active class from all buttons
            demoButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Generate demo content
            let stepsHtml = '';
            demo.steps.forEach((step, index) => {
                const statusClass = step.status === 'completed' ? 'completed' : 
                                  step.status === 'in-progress' ? 'in-progress' : 'pending';
                
                stepsHtml += `
                    <div class="demo-step ${statusClass}">
                        <div class="demo-step-icon">
                            <i class="${step.icon}"></i>
                        </div>
                        <div class="demo-step-content">
                            <h4>${step.text}</h4>
                            <div class="demo-step-status">
                                <span class="status-indicator ${statusClass}"></span>
                                <span class="status-text">${step.status.replace('-', ' ')}</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            demoContent.innerHTML = `
                <div class="demo-header">
                    <h3>${demo.title}</h3>
                    <p>Real-time process tracking</p>
                </div>
                <div class="demo-steps">
                    ${stepsHtml}
                </div>
            `;

            // Add demo-specific styles
            const style = document.createElement('style');
            style.textContent = `
                .demo-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                .demo-header h3 {
                    color: #1e293b;
                    margin-bottom: 0.5rem;
                }
                .demo-header p {
                    color: #64748b;
                }
                .demo-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .demo-step {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 10px;
                    border-left: 4px solid #e2e8f0;
                    transition: all 0.3s ease;
                }
                .demo-step.completed {
                    border-left-color: #10b981;
                    background: #f0fdf4;
                }
                .demo-step.in-progress {
                    border-left-color: #f59e0b;
                    background: #fffbeb;
                    animation: pulse 2s infinite;
                }
                .demo-step.pending {
                    border-left-color: #6b7280;
                    background: #f9fafb;
                }
                .demo-step-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #e2e8f0;
                    color: #6b7280;
                }
                .demo-step.completed .demo-step-icon {
                    background: #10b981;
                    color: white;
                }
                .demo-step.in-progress .demo-step-icon {
                    background: #f59e0b;
                    color: white;
                }
                .demo-step-content h4 {
                    margin: 0;
                    font-size: 1rem;
                    color: #1e293b;
                }
                .demo-step-status {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 0.25rem;
                }
                .status-indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #6b7280;
                }
                .status-indicator.completed {
                    background: #10b981;
                }
                .status-indicator.in-progress {
                    background: #f59e0b;
                }
                .status-text {
                    font-size: 0.8rem;
                    color: #64748b;
                    text-transform: capitalize;
                }
            `;
            document.head.appendChild(style);
        });
    });
});

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.workflow-step, .component-card, .benefit-card, .arch-layer');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Inventory flow animation
document.addEventListener('DOMContentLoaded', function() {
    const flowItems = document.querySelectorAll('.flow-item');
    
    flowItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        // Staggered animation on load
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Workflow step hover effects
document.addEventListener('DOMContentLoaded', function() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#7c3aed';
            this.style.transform = 'translateX(15px)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#2563eb';
            this.style.transform = 'translateX(0)';
        });
    });
});

// Component card animations
document.addEventListener('DOMContentLoaded', function() {
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach((card, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Process flow step animations
document.addEventListener('DOMContentLoaded', function() {
    const flowSteps = document.querySelectorAll('.flow-step');
    
    flowSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.2)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
});

// Statistics counter animation
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
});

// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Dynamic progress bars for demo steps
document.addEventListener('DOMContentLoaded', function() {
    const createProgressBar = (step) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-fill" style="width: ${step.status === 'completed' ? '100' : step.status === 'in-progress' ? '50' : '0'}%"></div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .progress-bar {
                width: 100%;
                height: 4px;
                background: #e2e8f0;
                border-radius: 2px;
                overflow: hidden;
                margin-top: 0.5rem;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #2563eb, #7c3aed);
                border-radius: 2px;
                transition: width 0.5s ease;
            }
        `;
        document.head.appendChild(style);
        
        return progressBar;
    };
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #2563eb !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyles);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
