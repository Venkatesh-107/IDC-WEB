// Script for simple interactions

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add scroll effect to navbar to make it pop more when scrolling down
    const nav = document.querySelector('.floating-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(27, 30, 40, 0.95)';
            nav.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.backgroundColor = 'rgba(27, 30, 40, 0.8)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    console.log("Welcome to Indian Data Club - AMCET Chapter");

    // Apple Text Effect Interaction
    const appleText = document.querySelector('.apple-text-effect');
    if (appleText) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Calculate move percentage (move background slightly to create parallax)
            const moveX = 50 + (x * 30 - 15); // Center 50%, shift +/- 15%
            const moveY = 50 + (y * 30 - 15);

            appleText.style.backgroundPosition = `${moveX}% ${moveY}%`;
        });
    }

    // Interactive Gallery Motion Function - Apple Style Refined
    function initInteractiveGallery(windowId, gridId, panelId) {
        const galleryWindow = document.getElementById(windowId);
        const galleryGrid = document.getElementById(gridId);
        const sidePanel = document.getElementById(panelId);

        if (!galleryWindow || !galleryGrid) return;

        const cards = galleryGrid.querySelectorAll('.gallery-card');
        const panelTitle = document.getElementById('panel-event-title');
        const panelDesc = document.getElementById('panel-event-desc');
        const panelImage = document.getElementById('panel-event-image');
        const panelContent = sidePanel ? sidePanel.querySelector('.side-panel-content') : null;

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const title = card.getAttribute('data-event-title');
                const desc = card.getAttribute('data-event-desc');
                const imgSrc = card.querySelector('img').src;

                // 1. Isolation effect
                galleryGrid.classList.add('has-active');
                card.classList.add('active');

                // 2. Update side panel
                if (panelTitle && panelContent) {
                    panelContent.classList.remove('active');
                    setTimeout(() => {
                        panelTitle.textContent = title;
                        panelDesc.textContent = desc;
                        panelImage.src = imgSrc;
                        panelContent.classList.add('active');
                    }, 50);
                }
            });

            card.addEventListener('mouseleave', () => {
                galleryGrid.classList.remove('has-active');
                card.classList.remove('active');
            });
        });

        // Scroll Indicator Logic
        if (galleryWindow) {
            const indicator = document.getElementById('scroll-indicator');
            if (indicator) {
                galleryWindow.addEventListener('scroll', () => {
                    const scrollTop = galleryWindow.scrollTop;
                    const scrollHeight = galleryWindow.scrollHeight;
                    const clientHeight = galleryWindow.clientHeight;

                    // Hide if scrolled more than 50px or near bottom
                    if (scrollTop > 50 || (scrollTop + clientHeight >= scrollHeight - 20)) {
                        indicator.classList.add('hidden');
                    } else {
                        indicator.classList.remove('hidden');
                    }
                });
            }
        }
    }

    // Initialize both instances
    initInteractiveGallery('gallery-window', 'gallery-grid'); // Happenings page
    initInteractiveGallery('gallery-window-home', 'gallery-grid-home', 'event-side-panel'); // Index page

    // Announcement Logic
    const announcementSection = document.getElementById('announcement');
    if (announcementSection) {
        // Set expiry date (YYYY-MM-DDTHH:MM:SS)
        // User should update this string to set the deadline
        const expiryDateString = '2026-01-10T23:59:59';
        const expiryDate = new Date(expiryDateString);
        const now = new Date();

        // Update date in UI
        const dateElement = document.getElementById('announce-date');
        if (dateElement) {
            dateElement.textContent = expiryDate.toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            });
        }

        // Check if expired
        if (now < expiryDate) {
            announcementSection.style.display = 'block'; // Show if valid
        } else {
            console.log('Announcement expired');
        }

        // Share Button Logic
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', async () => {
                const shareData = {
                    title: 'IDC Announcement',
                    text: '🚀 Upcoming Hackathon Registration Open! Don\'t miss out.',
                    url: window.location.href
                };

                try {
                    if (navigator.share) {
                        await navigator.share(shareData);
                    } else {
                        // Fallback: Copy to clipboard
                        await navigator.clipboard.writeText(`${shareData.title}: ${shareData.text} ${shareData.url}`);
                        alert('Link copied to clipboard!');
                    }
                } catch (err) {
                    console.error('Error sharing:', err);
                }
            });
        }
    }
});
