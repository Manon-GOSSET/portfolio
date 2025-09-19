// Fonction pour calculer la hauteur dynamique du viewport
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
}

// Calculer la hauteur au chargement
setViewportHeight();

// Recalculer la hauteur lors du redimensionnement
window.addEventListener('resize', setViewportHeight);

// Recalculer la hauteur lors de l'orientation change (mobile)
window.addEventListener('orientationchange', function() {
    setTimeout(setViewportHeight, 100);
});

// Recalculer la hauteur lors du scroll (pour les barres qui se cachent/affichent)
let ticking = false;
function updateViewportHeight() {
    if (!ticking) {
        requestAnimationFrame(function() {
            setViewportHeight();
            ticking = false;
        });
        ticking = true;
    }
}
window.addEventListener('scroll', updateViewportHeight);

// Animation d'entrée pour les éléments
document.addEventListener('DOMContentLoaded', function() {
    // Animation pour le titre PORTFOLIO
    const portfolioTitle = document.querySelector('.portfolio-title');
    const portfolioLine = document.querySelector('.portfolio-line');
    const nameSection = document.querySelector('.name-section');
    const nameLine = document.querySelector('.name-line');
    const verticalLines = document.querySelectorAll('.vertical-line');
    
    // Fonction d'animation
    function animateElements() {
        // Animation du titre PORTFOLIO
        setTimeout(() => {
            portfolioTitle.style.opacity = '0';
            portfolioTitle.style.transform = 'translateY(20px)';
            portfolioTitle.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                portfolioTitle.style.opacity = '1';
                portfolioTitle.style.transform = 'translateY(0)';
            }, 100);
        }, 200);
        
        // Animation des lignes
        setTimeout(() => {
            portfolioLine.style.width = '0';
            portfolioLine.style.transition = 'width 1s ease-out';
            
            setTimeout(() => {
                portfolioLine.style.width = '200px';
            }, 100);
        }, 400);
        
        // Animation de la section nom
        setTimeout(() => {
            nameSection.style.opacity = '0';
            nameSection.style.transform = 'translateY(20px)';
            nameSection.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                nameSection.style.opacity = '1';
                nameSection.style.transform = 'translateY(0)';
            }, 100);
        }, 600);
        
        // Animation de la ligne du nom
        setTimeout(() => {
            nameLine.style.width = '0';
            nameLine.style.transition = 'width 1s ease-out';
            
            setTimeout(() => {
                nameLine.style.width = '200px';
            }, 100);
        }, 800);
        
        // Animation des lignes verticales
        setTimeout(() => {
            verticalLines.forEach((line, index) => {
                line.style.height = '0';
                line.style.transition = 'height 1.2s ease-out';
                
                setTimeout(() => {
                    line.style.height = '50vh';
                }, index * 200);
            });
        }, 1000);
    }
    
    // Initialiser les styles pour l'animation
    function initAnimationStyles() {
        portfolioTitle.style.opacity = '0';
        portfolioTitle.style.transform = 'translateY(20px)';
        portfolioLine.style.width = '0';
        nameSection.style.opacity = '0';
        nameSection.style.transform = 'translateY(20px)';
        nameLine.style.width = '0';
        verticalLines.forEach(line => {
            line.style.height = '0';
        });
    }
    
    // Observer pour la première section - Animation à chaque visite
    const firstSection = document.getElementById('section-0');
    let isAnimating = false;
    let lastAnimationTime = 0;
    
    if (firstSection) {
        const firstSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAnimating) {
                    const currentTime = Date.now();
                    // Éviter les animations trop rapprochées (minimum 2 secondes)
                    if (currentTime - lastAnimationTime < 2000) {
                        return;
                    }
                    
                    isAnimating = true;
                    lastAnimationTime = currentTime;
                    
                    // Réinitialiser les styles pour l'animation
                    const portfolioTitle = entry.target.querySelector('.portfolio-title');
                    const portfolioLine = entry.target.querySelector('.portfolio-line');
                    const nameSection = entry.target.querySelector('.name-section');
                    const nameLine = entry.target.querySelector('.name-line');
                    const verticalLines = entry.target.querySelectorAll('.vertical-line');
                    
                    // Réinitialiser les styles
                    if (portfolioTitle) {
                        portfolioTitle.style.opacity = '0';
                        portfolioTitle.style.transform = 'translateY(20px)';
                        portfolioTitle.style.transition = 'all 0.8s ease-out';
                    }
                    if (portfolioLine) {
                        portfolioLine.style.width = '0';
                        portfolioLine.style.transition = 'width 1s ease-out';
                    }
                    if (nameSection) {
                        nameSection.style.opacity = '0';
                        nameSection.style.transform = 'translateY(20px)';
                        nameSection.style.transition = 'all 0.8s ease-out';
                    }
                    if (nameLine) {
                        nameLine.style.width = '0';
                        nameLine.style.transition = 'width 1s ease-out';
                    }
                    verticalLines.forEach(line => {
                        line.style.height = '0';
                        line.style.transition = 'height 1s ease-out';
                    });
                    
                    // Lancer l'animation
                    animateElements();
                    
                    // Réinitialiser le flag après l'animation (3 secondes)
                    setTimeout(() => {
                        isAnimating = false;
                    }, 3000);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        firstSectionObserver.observe(firstSection);
    }
    
    // Démarrer l'animation initiale
    initAnimationStyles();
    animateElements();
    
    // Effet de survol pour les éléments interactifs
    const interactiveElements = [portfolioTitle, nameSection];
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animation de la ligne au survol
    const lines = [portfolioLine, nameLine];
    
    lines.forEach(line => {
        line.addEventListener('mouseenter', function() {
            this.style.height = '2px';
            this.style.transition = 'height 0.3s ease';
        });
        
        line.addEventListener('mouseleave', function() {
            this.style.height = '1px';
        });
    });
    
    // Animation des cartes de projets
    const projectCards = document.querySelectorAll('.project-card');
    
    // Observer pour l'animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, observerOptions);
    
    // Observer chaque carte
    projectCards.forEach((card, index) => {
        // Initialiser les styles pour l'animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Observer la carte
        observer.observe(card);
        
        // Animation au clic
        card.addEventListener('click', function() {
            // Effet de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Animation des éléments internes
            const projectInfo = this.querySelector('.project-info');
            const projectImage = this.querySelector('.project-image');
            
            projectInfo.style.transform = 'scale(1.05)';
            projectImage.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                projectInfo.style.transform = 'scale(1)';
                projectImage.style.transform = 'scale(1)';
            }, 200);
            
            // Log pour debug (peut être remplacé par navigation)
            console.log(`Projet cliqué: ${this.dataset.project}`);
        });
        
        // Animation au survol des séparateurs
        const separator = card.querySelector('.project-separator');
        separator.addEventListener('mouseenter', function() {
            this.style.width = '60px';
            this.style.height = '2px';
            this.style.transition = 'all 0.3s ease';
        });
        
        separator.addEventListener('mouseleave', function() {
            this.style.width = '40px';
            this.style.height = '1px';
        });
    });
    
    // Animation de la section des projets au scroll avec animation en cascade des cartes
    const projectsSection = document.querySelector('.projects-section');
    const projectCardsAnimated = document.querySelectorAll('.project-card');
    
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation de la section principale
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                entry.target.style.transition = 'all 0.8s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animation en cascade des cartes
                    projectCardsAnimated.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, 300 + (index * 150)); // Délai progressif de 150ms entre chaque carte
                    });
                }, 200);
            }
        });
    }, { threshold: 0.1 });
    
    // Initialiser les styles de la section et des cartes
    projectsSection.style.opacity = '0';
    projectsSection.style.transform = 'translateY(50px)';
    
    // Initialiser les styles des cartes
    projectCardsAnimated.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
    });
    
    // Observer la section
    projectsObserver.observe(projectsSection);
    
    // Animation de la section CV au scroll
    const cvSection = document.querySelector('.cv-section');
    const cvObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation de la section principale
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(80px)';
                entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
                
                // Animation des colonnes avec délais échelonnés
                const columns = entry.target.querySelectorAll('.cv-column-1, .cv-column-2, .cv-column-3, .cv-column-4');
                columns.forEach((column, index) => {
                    column.style.opacity = '0';
                    column.style.transform = 'translateX(-50px)';
                    column.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        column.style.opacity = '1';
                        column.style.transform = 'translateX(0)';
                    }, 400 + (index * 200));
                });
                
                // Animation des éléments spécifiques
                setTimeout(() => {
                    // Animation de la photo
                    const photo = entry.target.querySelector('.cv-photo');
                    if (photo) {
                        photo.style.opacity = '0';
                        photo.style.transform = 'scale(0.8) rotate(-5deg)';
                        photo.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        
                        setTimeout(() => {
                            photo.style.opacity = '1';
                            photo.style.transform = 'scale(1) rotate(0deg)';
                        }, 600);
                    }
                    
                    // Animation du nom
                    const name = entry.target.querySelector('.cv-name');
                    if (name) {
                        name.style.opacity = '0';
                        name.style.transform = 'translateY(20px)';
                        name.style.transition = 'all 0.6s ease-out';
                        
                        setTimeout(() => {
                            name.style.opacity = '1';
                            name.style.transform = 'translateY(0)';
                        }, 800);
                    }
                    
                    // Animation des titres de sections
                    const sectionTitles = entry.target.querySelectorAll('.cv-section-title');
                    sectionTitles.forEach((title, index) => {
                        title.style.opacity = '0';
                        title.style.transform = 'translateY(30px)';
                        title.style.transition = 'all 0.6s ease-out';
                        
                        setTimeout(() => {
                            title.style.opacity = '1';
                            title.style.transform = 'translateY(0)';
                        }, 1000 + (index * 150));
                    });
                    
                    // Animation des éléments de liste
                    const listItems = entry.target.querySelectorAll('.experience-item, .education-item, .language-item, .competence-item');
                    listItems.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        item.style.transition = 'all 0.5s ease-out';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 1200 + (index * 50));
                    });
                    
                    // Animation des numéros de page
                    const pageNumbers = entry.target.querySelectorAll('.page-number-left, .page-number-right');
                    pageNumbers.forEach((pageNum, index) => {
                        pageNum.style.opacity = '0';
                        pageNum.style.transform = 'scale(0.5)';
                        pageNum.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        
                        setTimeout(() => {
                            pageNum.style.opacity = '1';
                            pageNum.style.transform = 'scale(1)';
                        }, 1500 + (index * 200));
                    });
                }, 200);
            }
        });
    }, { threshold: 0.1 });
    
    // Initialiser les styles de la section CV
    cvSection.style.opacity = '0';
    cvSection.style.transform = 'translateY(80px)';
    
    // Observer la section CV
    cvObserver.observe(cvSection);
    
    // Animation de la section projet détaillé au scroll
    const projectDetailSection = document.querySelector('.project-detail-section');
    const projectDetailObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation de la section principale
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(60px)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
                
                // Animation des colonnes avec délais échelonnés
                const textColumn = entry.target.querySelector('.project-text-column');
                const imageColumn = entry.target.querySelector('.project-image-column');
                
                if (textColumn) {
                    textColumn.style.opacity = '0';
                    textColumn.style.transform = 'translateX(-50px)';
                    textColumn.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        textColumn.style.opacity = '1';
                        textColumn.style.transform = 'translateX(0)';
                    }, 400);
                }
                
                if (imageColumn) {
                    imageColumn.style.opacity = '0';
                    imageColumn.style.transform = 'translateX(50px)';
                    imageColumn.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        imageColumn.style.opacity = '1';
                        imageColumn.style.transform = 'translateX(0)';
                    }, 600);
                }
                
                // Animation des éléments spécifiques
                setTimeout(() => {
                    // Animation du numéro de projet
                    const projectNumber = entry.target.querySelector('.project-number');
                    if (projectNumber) {
                        projectNumber.style.opacity = '0';
                        projectNumber.style.transform = 'scale(0.5)';
                        projectNumber.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        
                        setTimeout(() => {
                            projectNumber.style.opacity = '1';
                            projectNumber.style.transform = 'scale(1)';
                        }, 800);
                    }
                    
                    // Animation du titre
                    const projectTitle = entry.target.querySelector('.project-title');
                    if (projectTitle) {
                        projectTitle.style.opacity = '0';
                        projectTitle.style.transform = 'translateY(30px)';
                        projectTitle.style.transition = 'all 0.6s ease-out';
                        
                        setTimeout(() => {
                            projectTitle.style.opacity = '1';
                            projectTitle.style.transform = 'translateY(0)';
                        }, 1000);
                    }
                    
                    // Animation des paragraphes
                    const paragraphs = entry.target.querySelectorAll('.project-intro, .project-metaphor, .project-atmosphere');
                    paragraphs.forEach((paragraph, index) => {
                        paragraph.style.opacity = '0';
                        paragraph.style.transform = 'translateY(20px)';
                        paragraph.style.transition = 'all 0.6s ease-out';
                        
                        setTimeout(() => {
                            paragraph.style.opacity = '1';
                            paragraph.style.transform = 'translateY(0)';
                        }, 1200 + (index * 200));
                    });
                    
                    // Animation de l'image
                    const projectImage = entry.target.querySelector('.project-detail-image');
                    if (projectImage) {
                        projectImage.style.opacity = '0';
                        projectImage.style.transform = 'scale(0.9)';
                        projectImage.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        
                        setTimeout(() => {
                            projectImage.style.opacity = '1';
                            projectImage.style.transform = 'scale(1)';
                        }, 1400);
                    }
                    
                    // Animation des liens de navigation
                    const navLinks = entry.target.querySelectorAll('.project-nav-link');
                    navLinks.forEach((link, index) => {
                        link.style.opacity = '0';
                        link.style.transform = 'translateY(20px)';
                        link.style.transition = 'all 0.6s ease-out';
                        
                        setTimeout(() => {
                            link.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                        }, 1600 + (index * 100));
                    });
                }, 200);
            }
        });
    }, { threshold: 0.1 });
    
    // Initialiser les styles de la section projet détaillé
    projectDetailSection.style.opacity = '0';
    projectDetailSection.style.transform = 'translateY(60px)';
    
    // Observer la section projet détaillé
    projectDetailObserver.observe(projectDetailSection);
    
    // Observer pour la section Nature Hors Echelle
    const natureSection = document.getElementById('nature-section');
    if (natureSection) {
        const natureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation de la section principale
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(60px)';
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                    
                    // Animation des colonnes avec délais échelonnés
                    const textColumn = entry.target.querySelector('.project-text-column');
                    const imageColumn = entry.target.querySelector('.project-image-column');
                    
                    if (textColumn) {
                        textColumn.style.opacity = '0';
                        textColumn.style.transform = 'translateX(-50px)';
                        textColumn.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        
                        setTimeout(() => {
                            textColumn.style.opacity = '1';
                            textColumn.style.transform = 'translateX(0)';
                        }, 400);
                    }
                    
                    if (imageColumn) {
                        imageColumn.style.opacity = '0';
                        imageColumn.style.transform = 'translateX(50px)';
                        imageColumn.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        
                        setTimeout(() => {
                            imageColumn.style.opacity = '1';
                            imageColumn.style.transform = 'translateX(0)';
                        }, 600);
                    }
                    
                    // Animation des éléments spécifiques
                    setTimeout(() => {
                        // Animation du numéro de projet
                        const projectNumber = entry.target.querySelector('.project-number');
                        if (projectNumber) {
                            projectNumber.style.opacity = '0';
                            projectNumber.style.transform = 'scale(0.5)';
                            projectNumber.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                            
                            setTimeout(() => {
                                projectNumber.style.opacity = '1';
                                projectNumber.style.transform = 'scale(1)';
                            }, 800);
                        }
                        
                        // Animation du titre
                        const projectTitle = entry.target.querySelector('.project-title');
                        if (projectTitle) {
                            projectTitle.style.opacity = '0';
                            projectTitle.style.transform = 'translateY(30px)';
                            projectTitle.style.transition = 'all 0.6s ease-out';
                            
                            setTimeout(() => {
                                projectTitle.style.opacity = '1';
                                projectTitle.style.transform = 'translateY(0)';
                            }, 1000);
                        }
                        
                        // Animation des paragraphes
                        const paragraphs = entry.target.querySelectorAll('.project-intro, .project-metaphor, .project-atmosphere');
                        paragraphs.forEach((paragraph, index) => {
                            paragraph.style.opacity = '0';
                            paragraph.style.transform = 'translateY(20px)';
                            paragraph.style.transition = 'all 0.6s ease-out';
                            
                            setTimeout(() => {
                                paragraph.style.opacity = '1';
                                paragraph.style.transform = 'translateY(0)';
                            }, 1200 + (index * 200));
                        });
                        
                        // Animation de l'image
                        const projectImage = entry.target.querySelector('.project-detail-image');
                        if (projectImage) {
                            projectImage.style.opacity = '0';
                            projectImage.style.transform = 'scale(0.9)';
                            projectImage.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                            
                            setTimeout(() => {
                                projectImage.style.opacity = '1';
                                projectImage.style.transform = 'scale(1)';
                            }, 1400);
                        }
                        
                        // Animation des liens de navigation
                        const navLinks = entry.target.querySelectorAll('.project-nav-link');
                        navLinks.forEach((link, index) => {
                            link.style.opacity = '0';
                            link.style.transform = 'translateY(20px)';
                            link.style.transition = 'all 0.6s ease-out';
                            
                            setTimeout(() => {
                                link.style.opacity = '1';
                                link.style.transform = 'translateY(0)';
                            }, 1600 + (index * 100));
                        });
                    }, 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Initialiser les styles de la section Nature
        natureSection.style.opacity = '0';
        natureSection.style.transform = 'translateY(60px)';
        
        // Observer la section Nature
        natureObserver.observe(natureSection);
    }
    
    // Observer pour la section Cuisine sur mesure avec animations différentes
    const cuisineSection = document.getElementById('cuisine-section');
    if (cuisineSection) {
        const cuisineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation de la section principale avec effet de rotation
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(80px) rotateX(10deg)';
                    entry.target.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                    }, 300);
                    
                    // Animation des colonnes avec effet de slide diagonal
                    const textColumn = entry.target.querySelector('.project-text-column');
                    const imageColumn = entry.target.querySelector('.project-image-column');
                    
                    if (textColumn) {
                        textColumn.style.opacity = '0';
                        textColumn.style.transform = 'translateX(-80px) translateY(40px)';
                        textColumn.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        
                        setTimeout(() => {
                            textColumn.style.opacity = '1';
                            textColumn.style.transform = 'translateX(0) translateY(0)';
                        }, 600);
                    }
                    
                    if (imageColumn) {
                        imageColumn.style.opacity = '0';
                        imageColumn.style.transform = 'translateX(80px) translateY(-40px)';
                        imageColumn.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        
                        setTimeout(() => {
                            imageColumn.style.opacity = '1';
                            imageColumn.style.transform = 'translateX(0) translateY(0)';
                        }, 800);
                    }
                    
                    // Animation des éléments spécifiques avec effets différents
                    setTimeout(() => {
                        // Animation du numéro avec effet de bounce et rotation
                        const projectNumber = entry.target.querySelector('.project-number');
                        if (projectNumber) {
                            projectNumber.style.opacity = '0';
                            projectNumber.style.transform = 'scale(0.3) rotate(180deg)';
                            projectNumber.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            
                            setTimeout(() => {
                                projectNumber.style.opacity = '1';
                                projectNumber.style.transform = 'scale(1) rotate(0deg)';
                            }, 1000);
                        }
                        
                        // Animation du titre avec effet de wave
                        const projectTitle = entry.target.querySelector('.project-title');
                        if (projectTitle) {
                            projectTitle.style.opacity = '0';
                            projectTitle.style.transform = 'translateY(50px) skewY(5deg)';
                            projectTitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                projectTitle.style.opacity = '1';
                                projectTitle.style.transform = 'translateY(0) skewY(0deg)';
                            }, 1200);
                        }
                        
                        // Animation des paragraphes avec effet de cascade
                        const paragraphs = entry.target.querySelectorAll('.project-intro, .project-metaphor, .project-atmosphere');
                        paragraphs.forEach((paragraph, index) => {
                            paragraph.style.opacity = '0';
                            paragraph.style.transform = 'translateY(30px) scale(0.95)';
                            paragraph.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                paragraph.style.opacity = '1';
                                paragraph.style.transform = 'translateY(0) scale(1)';
                            }, 1400 + (index * 150));
                        });
                        
                        // Animation de l'image avec effet de zoom et rotation
                        const projectImage = entry.target.querySelector('.project-detail-image');
                        if (projectImage) {
                            projectImage.style.opacity = '0';
                            projectImage.style.transform = 'scale(0.8) rotate(5deg)';
                            projectImage.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                projectImage.style.opacity = '1';
                                projectImage.style.transform = 'scale(1) rotate(0deg)';
                            }, 1600);
                        }
                        
                        // Animation des liens de navigation avec effet de slide et bounce
                        const navLinks = entry.target.querySelectorAll('.project-nav-link');
                        navLinks.forEach((link, index) => {
                            link.style.opacity = '0';
                            link.style.transform = 'translateX(-30px) scale(0.9)';
                            link.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            
                            setTimeout(() => {
                                link.style.opacity = '1';
                                link.style.transform = 'translateX(0) scale(1)';
                            }, 1800 + (index * 120));
                        });
                    }, 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Initialiser les styles de la section Cuisine
        cuisineSection.style.opacity = '0';
        cuisineSection.style.transform = 'translateY(80px) rotateX(10deg)';
        
        // Observer la section Cuisine
        cuisineObserver.observe(cuisineSection);
    }

    // Observer pour la section Studio avec animations identiques à Cuisine
    const studioSection = document.getElementById('studio-section');
    if (studioSection) {
        const studioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation de la section principale avec effet de rotation
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(80px) rotateX(10deg)';
                    entry.target.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                    }, 300);
                    
                    // Animation des colonnes avec effet de slide diagonal
                    const textColumn = entry.target.querySelector('.project-text-column');
                    const imageColumn = entry.target.querySelector('.project-image-column');
                    
                    if (textColumn) {
                        textColumn.style.opacity = '0';
                        textColumn.style.transform = 'translateX(-80px) translateY(40px)';
                        textColumn.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        
                        setTimeout(() => {
                            textColumn.style.opacity = '1';
                            textColumn.style.transform = 'translateX(0) translateY(0)';
                        }, 600);
                    }
                    
                    if (imageColumn) {
                        imageColumn.style.opacity = '0';
                        imageColumn.style.transform = 'translateX(80px) translateY(-40px)';
                        imageColumn.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        
                        setTimeout(() => {
                            imageColumn.style.opacity = '1';
                            imageColumn.style.transform = 'translateX(0) translateY(0)';
                        }, 800);
                    }
                    
                    // Animation des éléments spécifiques avec effets différents
                    setTimeout(() => {
                        // Animation du numéro avec effet de bounce et rotation
                        const projectNumber = entry.target.querySelector('.project-number');
                        if (projectNumber) {
                            projectNumber.style.opacity = '0';
                            projectNumber.style.transform = 'scale(0.3) rotate(180deg)';
                            projectNumber.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            
                            setTimeout(() => {
                                projectNumber.style.opacity = '1';
                                projectNumber.style.transform = 'scale(1) rotate(0deg)';
                            }, 1000);
                        }
                        
                        // Animation du titre avec effet de wave
                        const projectTitle = entry.target.querySelector('.project-title');
                        if (projectTitle) {
                            projectTitle.style.opacity = '0';
                            projectTitle.style.transform = 'translateY(50px) skewY(5deg)';
                            projectTitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                projectTitle.style.opacity = '1';
                                projectTitle.style.transform = 'translateY(0) skewY(0deg)';
                            }, 1200);
                        }
                        
                        // Animation des paragraphes avec effet de cascade
                        const paragraphs = entry.target.querySelectorAll('.project-intro, .project-metaphor, .project-atmosphere');
                        paragraphs.forEach((paragraph, index) => {
                            paragraph.style.opacity = '0';
                            paragraph.style.transform = 'translateY(30px) scale(0.95)';
                            paragraph.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                paragraph.style.opacity = '1';
                                paragraph.style.transform = 'translateY(0) scale(1)';
                            }, 1400 + (index * 150));
                        });
                        
                        // Animation de l'image avec effet de zoom et rotation
                        const projectImage = entry.target.querySelector('.project-detail-image');
                        if (projectImage) {
                            projectImage.style.opacity = '0';
                            projectImage.style.transform = 'scale(0.8) rotate(5deg)';
                            projectImage.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                projectImage.style.opacity = '1';
                                projectImage.style.transform = 'scale(1) rotate(0deg)';
                            }, 1600);
                        }
                        
                        // Animation des liens de navigation avec effet de slide et bounce
                        const navLinks = entry.target.querySelectorAll('.project-nav-link');
                        navLinks.forEach((link, index) => {
                            link.style.opacity = '0';
                            link.style.transform = 'translateX(-30px) scale(0.9)';
                            link.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            
                            setTimeout(() => {
                                link.style.opacity = '1';
                                link.style.transform = 'translateX(0) scale(1)';
                            }, 1800 + (index * 120));
                        });
                    }, 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Initialiser les styles de la section Studio
        studioSection.style.opacity = '0';
        studioSection.style.transform = 'translateY(80px) rotateX(10deg)';
        
        // Observer la section Studio
        studioObserver.observe(studioSection);
    }

    // Observer pour la section Menuiserie avec animations identiques aux autres sections
    const menuiserieSection = document.getElementById('menuiserie-section');
    if (menuiserieSection) {
        const menuiserieObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation de la section principale avec effet de rotation
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(80px) rotateX(10deg)';
                    entry.target.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                    }, 300);
                    
                    // Animation des colonnes avec effet de slide diagonal
                    const textColumn = entry.target.querySelector('.project-text-column');
                    const imageColumn = entry.target.querySelector('.project-image-column');
                    
                    if (textColumn) {
                        textColumn.style.opacity = '0';
                        textColumn.style.transform = 'translateX(-80px) translateY(40px)';
                        textColumn.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        
                        setTimeout(() => {
                            textColumn.style.opacity = '1';
                            textColumn.style.transform = 'translateX(0) translateY(0)';
                        }, 600);
                    }
                    
                    if (imageColumn) {
                        imageColumn.style.opacity = '0';
                        imageColumn.style.transform = 'translateX(80px) translateY(-40px)';
                        imageColumn.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        
                        setTimeout(() => {
                            imageColumn.style.opacity = '1';
                            imageColumn.style.transform = 'translateX(0) translateY(0)';
                        }, 800);
                    }
                    
                    // Animation des éléments spécifiques avec effets différents
                    setTimeout(() => {
                        // Animation du numéro avec effet de bounce et rotation
                        const projectNumber = entry.target.querySelector('.project-number');
                        if (projectNumber) {
                            projectNumber.style.opacity = '0';
                            projectNumber.style.transform = 'scale(0.3) rotate(180deg)';
                            projectNumber.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            
                            setTimeout(() => {
                                projectNumber.style.opacity = '1';
                                projectNumber.style.transform = 'scale(1) rotate(0deg)';
                            }, 1000);
                        }
                        
                        // Animation du titre avec effet de wave
                        const projectTitle = entry.target.querySelector('.project-title');
                        if (projectTitle) {
                            projectTitle.style.opacity = '0';
                            projectTitle.style.transform = 'translateY(50px) skewY(5deg)';
                            projectTitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                projectTitle.style.opacity = '1';
                                projectTitle.style.transform = 'translateY(0) skewY(0deg)';
                            }, 1200);
                        }
                        
                        // Animation des paragraphes avec effet de cascade
                        const paragraphs = entry.target.querySelectorAll('.project-intro, .project-metaphor, .project-atmosphere');
                        paragraphs.forEach((paragraph, index) => {
                            paragraph.style.opacity = '0';
                            paragraph.style.transform = 'translateY(30px) scale(0.95)';
                            paragraph.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                paragraph.style.opacity = '1';
                                paragraph.style.transform = 'translateY(0) scale(1)';
                            }, 1400 + (index * 150));
                        });
                        
                        // Animation de l'image avec effet de zoom et rotation
                        const projectImage = entry.target.querySelector('.project-detail-image');
                        if (projectImage) {
                            projectImage.style.opacity = '0';
                            projectImage.style.transform = 'scale(0.8) rotate(5deg)';
                            projectImage.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                            setTimeout(() => {
                                projectImage.style.opacity = '1';
                                projectImage.style.transform = 'scale(1) rotate(0deg)';
                            }, 1600);
                        }
                        
                        // Animation des liens de navigation avec effet de slide et bounce
                        const navLinks = entry.target.querySelectorAll('.project-nav-link');
                        navLinks.forEach((link, index) => {
                            link.style.opacity = '0';
                            link.style.transform = 'translateX(-30px) scale(0.9)';
                            link.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            
                            setTimeout(() => {
                                link.style.opacity = '1';
                                link.style.transform = 'translateX(0) scale(1)';
                            }, 1800 + (index * 120));
                        });
                    }, 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Initialiser les styles de la section Menuiserie
        menuiserieSection.style.opacity = '0';
        menuiserieSection.style.transform = 'translateY(80px) rotateX(10deg)';
        
        // Observer la section Menuiserie
        menuiserieObserver.observe(menuiserieSection);
    }
    
    // Effets hover pour la section CV
    const cvElements = document.querySelectorAll('.cv-section-title, .experience-item, .education-item, .language-item, .competence-item');
    
    cvElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Effet hover spécial pour la photo
    const cvPhoto = document.querySelector('.cv-photo');
    if (cvPhoto) {
        cvPhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        cvPhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Effet hover pour le nom
    const cvName = document.querySelector('.cv-name');
    if (cvName) {
        cvName.addEventListener('mouseenter', function() {
            this.style.color = '#6b7c32';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        cvName.addEventListener('mouseleave', function() {
            this.style.color = '#000000';
            this.style.transform = 'scale(1)';
        });
    }
    
    // Navigation entre sections
    const sections = document.querySelectorAll('[id^="section-"], #nature-section, #cuisine-section, #studio-section, #menuiserie-section, #contact-section');
    const progressFill = document.getElementById('progressFill');
    const dots = document.querySelectorAll('.dot');
    const arrowDown = document.getElementById('arrowDown');
    const arrowUp = document.getElementById('arrowUp');
    const arrowDown2 = document.getElementById('arrowDown2');
    const arrowUp2 = document.getElementById('arrowUp2');
    const arrowUp3 = document.getElementById('arrowUp3');
    const arrowUp4 = document.getElementById('arrowUp4');
    const arrowUp5 = document.getElementById('arrowUp5');
    const arrowDown3 = document.getElementById('arrowDown3');
    const arrowDown4 = document.getElementById('arrowDown4');
    const arrowDown5 = document.getElementById('arrowDown5');
    const arrowUp6 = document.getElementById('arrowUp6');
    const arrowDown6 = document.getElementById('arrowDown6');
    const arrowUp7 = document.getElementById('arrowUp7');
    const arrowDown7 = document.getElementById('arrowDown7');
    const arrowUp8 = document.getElementById('arrowUp8');
    const arrowDown8 = document.getElementById('arrowDown8');
    
    let currentSection = 0;
    
    // Fonction pour mettre à jour la barre de progression
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressFill.style.width = scrollPercent + '%';
        
        // Mettre à jour les dots actifs
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
            
            if (isVisible) {
                currentSection = index;
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    }
    
    // Fonction pour naviguer vers une section
    function goToSection(sectionIndex) {
        if (sections[sectionIndex]) {
            // Calculer la position avec offset pour corriger l'anchor offset
            const elementTop = sections[sectionIndex].offsetTop;
            const offsetPosition = elementTop;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Réattacher les event listeners après le scroll
            setTimeout(() => {
                attachProjectNavListeners();
            }, 100);
        }
    }
    
    // Event listeners pour les flèches
    arrowDown.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        }
    });
    
    arrowUp.addEventListener('click', () => {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    });
    
    arrowDown2.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        }
    });
    
    arrowUp2.addEventListener('click', () => {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    });
    
    arrowUp3.addEventListener('click', () => {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    });
    
    arrowDown3.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        }
    });
    
    arrowUp4.addEventListener('click', () => {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    });
    
    arrowUp5.addEventListener('click', () => {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    });
    
    arrowDown4.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        }
    });
    
    arrowDown5.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        }
    });
    
    arrowUp6.addEventListener('click', () => {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    });
    
    arrowDown6.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        }
    });
    
    arrowUp7.addEventListener('click', () => {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    });
    
    arrowDown7.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        }
    });
    
    arrowUp8.addEventListener('click', () => {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    });
    
    arrowDown8.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        }
    });
    
    // Event listeners pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSection(index);
        });
    });
    
    // Event listener pour le scroll
    window.addEventListener('scroll', updateProgress);
    
    // Correction pour les liens d'ancres - éviter l'anchor offset
    document.addEventListener('click', function(e) {
        // Vérifier si c'est un lien d'ancre
        if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
            const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
            const href = link.getAttribute('href');
            
            if (href && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Utiliser scrollTo avec offset 0 pour éviter l'anchor offset
                    const elementTop = targetElement.offsetTop;
                    window.scrollTo({
                        top: elementTop,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
    
    // Event listeners pour les touches du clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentSection < sections.length - 1) {
                goToSection(currentSection + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentSection > 0) {
                goToSection(currentSection - 1);
            }
        } else if (e.key === 'Home') {
            e.preventDefault();
            goToSection(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            goToSection(sections.length - 1);
        }
    });
    
    // Masquer/afficher les flèches selon la section
    function updateArrows() {
        // Reset all arrows
        arrowUp.style.opacity = '0';
        arrowUp.style.pointerEvents = 'none';
        arrowDown.style.opacity = '0';
        arrowDown.style.pointerEvents = 'none';
        arrowUp2.style.opacity = '0';
        arrowUp2.style.pointerEvents = 'none';
        arrowDown2.style.opacity = '0';
        arrowDown2.style.pointerEvents = 'none';
        arrowUp3.style.opacity = '0';
        arrowUp3.style.pointerEvents = 'none';
        arrowUp4.style.opacity = '0';
        arrowUp4.style.pointerEvents = 'none';
        arrowDown3.style.opacity = '0';
        arrowDown3.style.pointerEvents = 'none';
        arrowDown4.style.opacity = '0';
        arrowDown4.style.pointerEvents = 'none';
        arrowUp5.style.opacity = '0';
        arrowUp5.style.pointerEvents = 'none';
        arrowDown5.style.opacity = '0';
        arrowDown5.style.pointerEvents = 'none';
        arrowUp6.style.opacity = '0';
        arrowUp6.style.pointerEvents = 'none';
        arrowDown6.style.opacity = '0';
        arrowDown6.style.pointerEvents = 'none';
        arrowUp7.style.opacity = '0';
        arrowUp7.style.pointerEvents = 'none';
        arrowDown7.style.opacity = '0';
        arrowDown7.style.pointerEvents = 'none';
        arrowUp8.style.opacity = '0';
        arrowUp8.style.pointerEvents = 'none';
        arrowDown8.style.opacity = '0';
        arrowDown8.style.pointerEvents = 'none';
        
        if (currentSection === 0) {
            // Section 0 (Accueil) - Seulement flèche vers le bas
            arrowDown.style.opacity = '1';
            arrowDown.style.pointerEvents = 'auto';
        } else if (currentSection === 1) {
            // Section 1 (Projets) - Flèches vers le haut et le bas
            arrowUp.style.opacity = '1';
            arrowUp.style.pointerEvents = 'auto';
            arrowDown2.style.opacity = '1';
            arrowDown2.style.pointerEvents = 'auto';
        } else if (currentSection === 2) {
            // Section 2 (CV) - Flèches vers le haut et le bas
            arrowUp2.style.opacity = '1';
            arrowUp2.style.pointerEvents = 'auto';
            arrowDown3.style.opacity = '1';
            arrowDown3.style.pointerEvents = 'auto';
        } else if (currentSection === 3) {
            // Section 3 (Chataigne) - Flèches vers le haut et le bas
            arrowUp3.style.opacity = '1';
            arrowUp3.style.pointerEvents = 'auto';
            arrowDown4.style.opacity = '1';
            arrowDown4.style.pointerEvents = 'auto';
        } else if (currentSection === 4) {
            // Section 4 (Nature) - Flèches vers le haut et le bas
            arrowUp4.style.opacity = '1';
            arrowUp4.style.pointerEvents = 'auto';
            arrowDown5.style.opacity = '1';
            arrowDown5.style.pointerEvents = 'auto';
        } else if (currentSection === 5) {
            // Section 5 (Cuisine) - Flèches vers le haut et le bas
            arrowUp5.style.opacity = '1';
            arrowUp5.style.pointerEvents = 'auto';
            arrowDown6.style.opacity = '1';
            arrowDown6.style.pointerEvents = 'auto';
        } else if (currentSection === 6) {
            // Section 6 (Studio) - Flèches vers le haut et le bas
            arrowUp6.style.opacity = '1';
            arrowUp6.style.pointerEvents = 'auto';
            arrowDown7.style.opacity = '1';
            arrowDown7.style.pointerEvents = 'auto';
        } else if (currentSection === 7) {
            // Section 7 (Menuiserie) - Flèches vers le haut et le bas
            arrowUp7.style.opacity = '1';
            arrowUp7.style.pointerEvents = 'auto';
            arrowDown8.style.opacity = '1';
            arrowDown8.style.pointerEvents = 'auto';
        } else if (currentSection === 8) {
            // Section 8 (Contact) - Seulement flèche vers le haut
            arrowUp8.style.opacity = '1';
            arrowUp8.style.pointerEvents = 'auto';
        }
        
        // Réattacher les event listeners pour les liens de navigation
        attachProjectNavListeners();
        
        // Debug après mise à jour
        setTimeout(() => {
            debugProjectNavLinks();
        }, 100);
    }
    
    // Mettre à jour les flèches au scroll
    window.addEventListener('scroll', () => {
        updateArrows();
    });
    
    // Gestion de la navbar latérale
    const navbarItems = document.querySelectorAll('.navbar-item');
    const projectLinks = document.querySelectorAll('.project-link');
    
    // Fonction pour gérer le clic sur les liens
    function handleLinkClick(e, targetSection) {
        e.preventDefault();
        goToSection(targetSection);
    }
    
    // Fonction pour mettre à jour l'état actif de la navbar
    function updateNavbarActive() {
        navbarItems.forEach((item, index) => {
            if (index === currentSection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Event listeners pour les liens de la navbar
    navbarItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#section-')) {
                const sectionIndex = parseInt(href.split('-')[1]);
                handleLinkClick(e, sectionIndex);
            }
        });
    });
    
    // Event listeners pour les liens de projets
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#section-')) {
                const sectionIndex = parseInt(href.split('-')[1]);
                handleLinkClick(e, sectionIndex);
            }
        });
    });
    
    // Mettre à jour la navbar au scroll
    window.addEventListener('scroll', () => {
        updateNavbarActive();
    });
    
    // Optimisation simple pour éviter les bugs de debounce
    let hoverTimeout = null;
    
    // Fonction simple pour gérer les hover sans conflits
    function setupHoverOptimization() {
        // Utiliser des event listeners simples sans conflits
        const projectCards = document.querySelectorAll('.project-card');
        const dots = document.querySelectorAll('.dot');
        
        // Event listeners pour les cartes de projet
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                clearTimeout(hoverTimeout);
                card.style.willChange = 'transform';
            }, { passive: true });
            
            card.addEventListener('mouseleave', (e) => {
                e.stopPropagation();
                hoverTimeout = setTimeout(() => {
                    card.style.willChange = 'auto';
                }, 50);
            }, { passive: true });
        });
        
        // Event listeners pour les dots
        dots.forEach(dot => {
            dot.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                clearTimeout(hoverTimeout);
                dot.style.willChange = 'transform';
            }, { passive: true });
            
            dot.addEventListener('mouseleave', (e) => {
                e.stopPropagation();
                hoverTimeout = setTimeout(() => {
                    dot.style.willChange = 'auto';
                }, 50);
            }, { passive: true });
        });
    }
    
    // Initialiser l'optimisation
    setupHoverOptimization();
    
    // Gestion de la navigation du projet avec modal
    const projectNavLinks = document.querySelectorAll('.project-nav-link');
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    // Vérifier que tous les éléments du modal existent
    if (!modal || !modalTitle || !modalImage || !modalClose || !modalOverlay || !modalPrev || !modalNext) {
        console.error('Modal elements not found');
        return;
    }
    
    // Données des images pour chaque section (une image par section)
    const projectImages = {
        concept: {
            title: 'Concept',
            images: [
                {
                    src: 'Links/Chataigne/chataigne-concept.png',
                    title: 'Concept',
                    downloadUrl: 'Links/Chataigne/chataigne-concept.png',
                    downloadName: 'chataigne-concept.png'
                }
            ]
        },
        plans: {
            title: 'Plans d\'étage',
            images: [
                {
                    src: 'Links/Chataigne/Nvx_Plan_1_50_RDC-1.png',
                    title: 'Plan RDC',
                    downloadUrl: 'Links/Chataigne/Nvx_Plan_1_50_RDC.pdf',
                    downloadName: 'Nvx_Plan_1_50_RDC.pdf'
                },
                {
                    src: 'Links/Chataigne/Nvx_Plan_1_50_R+1.png',
                    title: 'Plan R+1',
                    downloadUrl: 'Links/Chataigne/Nvx_Plan_1_50_R+1.pdf',
                    downloadName: 'Nvx_Plan_1_50_R+1.pdf'
                }
            ]
        },
        coupes: {
            title: 'Coupes',
            images: [
                {
                    src: 'Links/Chataigne/Nvx_Coupe_AA_1_50-1.png',
                    title: 'Coupe AA',
                    downloadUrl: 'Links/Chataigne/Nvx_Coupe_AA_1_50.pdf',
                    downloadName: 'Nvx_Coupe_AA_1_50.pdf'
                },
                {
                    src: 'Links/Chataigne/Nvx_Coupe_BB_1_50-1.png',
                    title: 'Coupe BB',
                    downloadUrl: 'Links/Chataigne/Nvx_Coupe_BB_1_50.pdf',
                    downloadName: 'Nvx_Coupe_BB_1_50.pdf'
                }
            ]
        },
        visuels: {
            title: 'Visuels 3D',
            images: [
                {
                    src: 'Links/Chataigne/Enscape_2025-05-27-16-16-34_Scène 2.png',
                    title: 'Scène 2',
                    downloadUrl: 'Links/Chataigne/Enscape_2025-05-27-16-16-34_Scène 2.png',
                    downloadName: 'Enscape_2025-05-27-16-16-34_Scène 2.png',
                },
                {
                    src: 'Links/Chataigne/Enscape_2025-05-27-16-16-34_Scène 51.png',
                    title: 'Scène 51',
                    downloadUrl: 'Links/Chataigne/Enscape_2025-05-27-16-16-34_Scène 51.png',
                    downloadName: 'Enscape_2025-05-27-16-16-34_Scène 51.png',
                },
                {
                    src: 'Links/Chataigne/Enscape_2025-05-27-16-16-34_Scène 6.png',
                    title: 'Scène 6',
                    downloadUrl: 'Links/Chataigne/Enscape_2025-05-27-16-16-34_Scène 6.png',
                    downloadName: 'Enscape_2025-05-27-16-16-34_Scène 6.png',
                },
                {
                    src: 'Links/Chataigne/Enscape_2025-05-27-16-16-34_Scène 14.png',
                    title: 'Scène 14',
                    downloadUrl: 'Links/Chataigne/Enscape_2025-05-27-16-16-34_Scène 14.png',
                    downloadName: 'Enscape_2025-05-27-16-16-34_Scène 14.png',
                }
            ]
        }
    };
    
    // Données des images pour La Nature Hors Echelle
    const natureImages = {
        'nature-concept': {
            title: 'Concept',
            images: [
                {
                    src: 'Links/Nature/concept.png',
                    title: 'Concept',
                    downloadUrl: 'Links/Nature/concept.png',
                    downloadName: 'concept.png'
                },
                {
                    src: 'Links/Nature/concept1.png',
                    title: 'Concept 1',
                    downloadUrl: 'Links/Nature/concept1.png',
                    downloadName: 'concept1.png'
                },
                {
                    src: 'Links/Nature/concept2.png',
                    title: 'Concept 2',
                    downloadUrl: 'Links/Nature/concept2.png',
                    downloadName: 'concept2.png'
                },
                {
                    src: 'Links/Nature/concept3.png',
                    title: 'Concept 3',
                    downloadUrl: 'Links/Nature/concept3.png',
                    downloadName: 'concept3.png'
                }
            ]
        },
        'nature-plans': {
            title: 'Plans d\'étage',
            images: [
                {
                    src: 'Links/Nature/Station_MU_PlanRDCfinal-RDC-1.png',
                    title: 'Plan RDC',
                    downloadUrl: 'Links/Nature/Station_MU_PlanRDCfinal-RDC.pdf',
                    downloadName: 'Station_MU_PlanRDCfinal-RDC.pdf'
                },
                {
                    src: 'Links/Nature/Station_MU_PlanRDCfinal-R+1-1.png',
                    title: 'Plan R+1',
                    downloadUrl: 'Links/Nature/Station_MU_PlanRDCfinal-R+1.pdf',
                    downloadName: 'Station_MU_PlanRDCfinal-R+1.pdf'
                }
            ]
        },
        'nature-coupes': {
            title: 'Coupes',
            images: [
                {
                    src: 'Links/Nature/coupe_longitudinale.png',
                    title: 'Coupe longitudinale',
                    downloadUrl: 'Links/Nature/coupe_longitudinale.png',
                    downloadName: 'coupe_longitudinale.png'
                }
            ]
        },
        'nature-visuels': {
            title: 'Visuels 3D',
            images: [
                {
                    src: 'Links/Nature/Cafet_5.png',
                    title: 'Cafet',
                    downloadUrl: 'Links/Nature/Cafet_5.png',
                    downloadName: 'Cafet_5.png'
                },
                {
                    src: 'Links/Nature/Multifonction_1.png',
                    title: 'Multifonction',
                    downloadUrl: 'Links/Nature/Multifonction_1.png',
                    downloadName: 'Multifonction_1.png'
                },
                {
                    src: 'Links/Nature/Forum_5.png',
                    title: 'Forum',
                    downloadUrl: 'Links/Nature/Forum_5.png',
                    downloadName: 'Forum_5.png'
                },
                {
                    src: 'Links/Nature/Foret_1.png',
                    title: 'Foret',
                    downloadUrl: 'Links/Nature/Foret_1.png',
                    downloadName: 'Foret_1.png'
                },
            ]
        }
    };
    
    // Données des images pour Cuisine sur mesure
    const cuisineImages = {
        'cuisine-concept': {
            title: 'Concept',
            images: [
                {
                    src: 'Links/Cuisine/concept.png',
                    title: 'Concept',
                    downloadUrl: 'Links/Cuisine/concept.png',
                    downloadName: 'concept.png'
                },
                {
                    src: 'Links/Cuisine/concept1.png',
                    title: 'Concept 1',
                    downloadUrl: 'Links/Cuisine/concept1.png',
                    downloadName: 'concept1.png'
                },
                {
                    src: 'Links/Cuisine/concept2.png',
                    title: 'Concept 2',
                    downloadUrl: 'Links/Cuisine/concept2.png',
                    downloadName: 'concept2.png'
                },
                {
                    src: 'Links/Cuisine/concept3.png',
                    title: 'Concept 3',
                    downloadUrl: 'Links/Cuisine/concept3.png',
                    downloadName: 'concept3.png'
                }
            ]
        },
        'cuisine-plans': {
            title: 'Plans d\'étage',
            images: [
                {
                    src: 'Links/Cuisine/Plan_Cuisine_Portfolio-1.png',
                    title: 'Plan Cuisine',
                    downloadUrl: 'Links/Cuisine/Plan_Cuisine_Portfolio.pdf',
                    downloadName: 'Plan_Cuisine_Portfolio.pdf'
                },
            ]
        },
        'cuisine-visuels': {
            title: 'Rendu réel',
            images: [
                {
                    src: 'Links/Cuisine/IMG_6188.png',
                    title: 'Rendu 1',
                    downloadUrl: 'Links/Cuisine/IMG_6188.png',
                    downloadName: 'IMG_6188.png'
                },
                {
                    src: 'Links/Cuisine/IMG_6187.png',
                    title: 'Rendu 2',
                    downloadUrl: 'Links/Cuisine/IMG_6187.png',
                    downloadName: 'IMG_6187.png'
                },
                {
                    src: 'Links/Cuisine/IMG_6192.png',
                    title: 'Rendu 3',
                    downloadUrl: 'Links/Cuisine/IMG_6192.png',
                    downloadName: 'IMG_6192.png'
                },
                {
                    src: 'Links/Cuisine/IMG_6190.png',
                    title: 'Rendu 4',
                    downloadUrl: 'Links/Cuisine/IMG_6190.png',
                    downloadName: 'IMG_6190.png'
                },
                {
                    src: 'Links/Cuisine/IMG_6191.png',
                    title: 'Rendu 5',
                    downloadUrl: 'Links/Cuisine/IMG_6191.png',
                    downloadName: 'IMG_6191.png'
                }
            ]
        }
    };
    
    // Données pour la section Studio
    const studioImages = {
        'studio-concept': {
            title: 'Concept',
            images: [
                {
                    src: 'Links/Studio/concept.png',
                    title: 'Concept',
                    downloadUrl: 'Links/Studio/concept.png',
                    downloadName: 'concept.png'
                },
                {
                    src: 'Links/Studio/plan_de_lexistant.png',
                    title: 'Plan existant',
                    downloadUrl: 'Links/Studio/STUDIO_BORROMEE_PLAN_DCE_modif_27-06-22-EXISTANT_50.pdf',
                    downloadName: 'STUDIO_BORROMEE_PLAN_DCE_modif_27-06-22-EXISTANT_50.pdf'
                },
                {
                    src: 'Links/Studio/plan_des_deposes.png',
                    title: 'Plan des déposes',
                    downloadUrl: 'Links/Studio/STUDIO_BORRO_E_PLAN_DCE_modif_27-06-22-PROPOSITION DEPOSE.pdf',
                    downloadName: 'STUDIO_BORRO_E_PLAN_DCE_modif_27-06-22-PROPOSITION DEPOSE.pdf',
                },
                {
                    src: 'Links/Studio/plan_des_cloisons.png',
                    title: 'Plan des cloisons',
                    downloadUrl: 'Links/Studio/STUDIO_BORROMEE_PLAN_DCE_modif_27-06-22-PROPOSITION CLOISONS.pdf',
                    downloadName: 'STUDIO_BORROMEE_PLAN_DCE_modif_27-06-22-PROPOSITION CLOISONS.pdf',
                }
            ]
        },
        'studio-plans': {
            title: 'Plans d\'étage',
            images: [
                {
                    src: 'Links/Studio/plan_etage.png',
                    title: 'Plan étage',
                    downloadUrl: 'Links/Studio/STUDIO_BORROMEE_PLAN DCE_modif_27-06-22-PROPOSITION_MOBILIER.pdf',
                    downloadName: 'STUDIO_BORROMEE_PLAN DCE_modif_27-06-22-PROPOSITION_MOBILIER.pdf'
                },
            ]
        },
        'studio-visuels': {
            title: 'Rendu réel',
            images: [
                {
                    src: 'Links/Studio/rendu_reel_1.png',
                    title: 'Rendu 1',
                    downloadUrl: 'Links/Studio/rendu_reel_1.png',
                    downloadName: 'rendu_reel_1.png'
                },
                {
                    src: 'Links/Studio/Séjour vue canapé 2 2-min.png',
                    title: 'Séjour vue canapé 2',
                    downloadUrl: 'Links/Studio/Séjour vue canapé 2 2-min.png',
                    downloadName: 'Séjour vue canapé 2 2-min.png'
                },
                {
                    src: 'Links/Studio/rendu_reel_3.png',
                    title: 'Rendu 3',
                    downloadUrl: 'Links/Studio/rendu_reel_3.png',
                    downloadName: 'rendu_reel_3.png'
                },
                {
                    src: 'Links/Studio/rendu_reel_4.png',
                    title: 'Rendu 4',
                    downloadUrl: 'Links/Studio/rendu_reel_4.png',
                    downloadName: 'rendu_reel_4.png'
                },
                {
                    src: 'Links/Studio/rendu_reel_5.png',
                    title: 'Rendu 5',
                    downloadUrl: 'Links/Studio/rendu_reel_5.png',
                    downloadName: 'rendu_reel_5.png'
                }
            ]
        }
    };
    
    // Données pour la section Menuiserie
    const menuiserieImages = {
        'menuiserie-plans': {
            title: 'Plans d\'exécution',
            images: [
                {
                    src: 'Links/Menuiserie/231106_VITTE_MILLY_Claustras2-1.png',
                    title: 'Claustra',
                    downloadUrl: 'Links/Menuiserie/231106_VITTE_MILLY_Claustras2.pdf',
                    downloadName: '231106_VITTE_MILLY_Claustras2.pdf'
                },
                {
                    src: 'Links/Menuiserie/231031_CHAMPS_VITTE_MeubleTV-1.png',
                    title: 'Meuble TV',
                    downloadUrl: 'Links/Menuiserie/231031_CHAMPS_VITTE_MeubleTV.pdf',
                    downloadName: '231031_CHAMPS_VITTE_MeubleTV.pdf'
                }
            ]
        },
        'menuiserie-visuels': {
            title: 'Rendu réel',
            images: [
                {
                    src: 'Links/Menuiserie/1a27a2c1-2b7a-4380-993f-cac5da171dc0 2.JPG',
                    title: 'Meuble TV',
                    downloadUrl: 'Links/Menuiserie/1a27a2c1-2b7a-4380-993f-cac5da171dc0 2.JPG',
                    downloadName: '1a27a2c1-2b7a-4380-993f-cac5da171dc0 2.JPG'
                },
                {
                    src: 'Links/Menuiserie/10ead6bf-58b5-4679-826e-5946210796fe 2.JPG',
                    title: 'Claustra',
                    downloadUrl: 'Links/Menuiserie/10ead6bf-58b5-4679-826e-5946210796fe 2.JPG',
                    downloadName: '10ead6bf-58b5-4679-826e-5946210796fe 2.JPG'
                },
                {
                    src: 'Links/Menuiserie/6cc8305c-4d78-4d5c-8153-75f2dae57c41 3.JPG',
                    title: 'Claustra',
                    downloadUrl: 'Links/Menuiserie/6cc8305c-4d78-4d5c-8153-75f2dae57c41 3.JPG',
                    downloadName: '6cc8305c-4d78-4d5c-8153-75f2dae57c41 3.JPG'
                },
                {
                    src: 'Links/Menuiserie/9c1e3ee1-ee98-4b92-a236-cca0d2fa9153.JPG',
                    title: 'Rendu 4',
                    downloadUrl: 'Links/Menuiserie/9c1e3ee1-ee98-4b92-a236-cca0d2fa9153.JPG',
                    downloadName: '9c1e3ee1-ee98-4b92-a236-cca0d2fa9153.JPG'
                },
                {
                    src: 'Links/Menuiserie/c9758bef-ee2a-4d4c-99e4-b11d0f76ded6 2.JPG',
                    title: 'Rendu 5',
                    downloadUrl: 'Links/Menuiserie/c9758bef-ee2a-4d4c-99e4-b11d0f76ded6 2.JPG',
                    downloadName: 'c9758bef-ee2a-4d4c-99e4-b11d0f76ded6 2.JPG'
                },
                {
                    src: 'Links/Menuiserie/c76fa71d-0191-4caa-8b68-737a6408ca82.JPG',
                    title: 'Rendu 6',
                    downloadUrl: 'Links/Menuiserie/c76fa71d-0191-4caa-8b68-737a6408ca82.JPG',
                    downloadName: 'c76fa71d-0191-4caa-8b68-737a6408ca82.JPG'
                },
                {
                    src: 'Links/Menuiserie/e89f7580-c95d-4e2c-82d8-f09ef094fff3.JPG',
                    title: 'Rendu 7',
                    downloadUrl: 'Links/Menuiserie/e89f7580-c95d-4e2c-82d8-f09ef094fff3.JPG',
                    downloadName: 'e89f7580-c95d-4e2c-82d8-f09ef094fff3.JPG'
                }
            ]
        }
    };
    
    // Ordre des sections pour la navigation
    const sectionOrder = ['concept', 'plans', 'coupes', 'visuels'];
    const natureSectionOrder = ['nature-concept', 'nature-plans', 'nature-coupes', 'nature-visuels'];
    const cuisineSectionOrder = ['cuisine-concept', 'cuisine-plans', 'cuisine-visuels'];
    const studioSectionOrder = ['studio-concept', 'studio-plans', 'studio-visuels'];
    const menuiserieSectionOrder = ['menuiserie-plans', 'menuiserie-visuels'];
    
    let currentProjectSection = null;
    
    // Fonction pour afficher une image en zoom
    function showZoomedImage(imageSrc, imageTitle) {
        // Créer l'overlay de zoom s'il n'existe pas
        let zoomOverlay = document.getElementById('zoomOverlay');
        if (!zoomOverlay) {
            zoomOverlay = document.createElement('div');
            zoomOverlay.id = 'zoomOverlay';
            zoomOverlay.className = 'zoom-overlay';
            document.body.appendChild(zoomOverlay);
        }
        
        // Mettre à jour le contenu
        zoomOverlay.innerHTML = `
            <div class="zoom-container">
                <div class="zoom-header">
                    <h3 class="zoom-title">${imageTitle}</h3>
                </div>
                <div class="zoom-content">
                    <div class="zoom-image-wrapper">
                        <img src="${imageSrc}" alt="${imageTitle}" class="zoom-image">
                        <button class="zoom-close" id="zoomClose" title="Fermer">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter les gestionnaires d'événements après création du DOM
        setTimeout(() => {
            const zoomClose = document.getElementById('zoomClose');
            if (zoomClose) {
                zoomClose.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeZoomedImage();
                });
            }
            
            zoomOverlay.addEventListener('click', (e) => {
                if (e.target === zoomOverlay || e.target.classList.contains('zoom-container')) {
                    closeZoomedImage();
                }
            });
            
            // Fermer avec la touche Échap
            const handleEscape = (e) => {
                if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
                    closeZoomedImage();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        }, 10);
        
        // Afficher l'overlay
        zoomOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Fonction pour fermer l'image zoomée
    function closeZoomedImage() {
        const zoomOverlay = document.getElementById('zoomOverlay');
        if (zoomOverlay) {
            zoomOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Nettoyer après l'animation
            setTimeout(() => {
                if (zoomOverlay && !zoomOverlay.classList.contains('active')) {
                    zoomOverlay.remove();
                }
            }, 300);
        }
    }
    
    // Fonction pour ouvrir le modal
    function openModal(section) {
        console.log('openModal called with section:', section);
        currentProjectSection = section;
        
        // Déterminer quelle base de données utiliser
        let sectionData;
        let currentSectionOrder;
        
        if (section.startsWith('nature-')) {
            sectionData = natureImages[section];
            currentSectionOrder = natureSectionOrder;
        } else if (section.startsWith('cuisine-')) {
            sectionData = cuisineImages[section];
            currentSectionOrder = cuisineSectionOrder;
        } else if (section.startsWith('studio-')) {
            sectionData = studioImages[section];
            currentSectionOrder = studioSectionOrder;
        } else if (section.startsWith('menuiserie-')) {
            sectionData = menuiserieImages[section];
            currentSectionOrder = menuiserieSectionOrder;
        } else {
            sectionData = projectImages[section];
            currentSectionOrder = sectionOrder;
        }
        
        console.log('sectionData:', sectionData);
        
        // Vérifier que le modal et ses éléments existent
        if (!modal || !modalImage || !modalTitle) {
            console.error('Modal elements not found:', {
                modal: !!modal,
                modalImage: !!modalImage,
                modalTitle: !!modalTitle
            });
            return;
        }
        
        if (sectionData) {
            modalTitle.textContent = sectionData.title;
            
            // Gérer les images multiples ou une seule image
            if (sectionData.images && sectionData.images.length > 0) {
                // Trouver le conteneur d'images de manière plus robuste
                let imageContainer = modalImage.parentElement;
                
                // Si parentElement n'existe pas, chercher par classe
                if (!imageContainer) {
                    imageContainer = document.querySelector('.modal-image-container');
                }
                
                // Vérifier que le conteneur existe
                if (!imageContainer) {
                    console.error('Image container not found, modalImage:', modalImage);
                    console.error('modalImage.parentElement:', modalImage?.parentElement);
                    console.error('Available containers:', document.querySelectorAll('.modal-image-container'));
                    return;
                }
                
                // Vider complètement le conteneur d'images
                imageContainer.innerHTML = '';
                
                // Recréer la structure de base avec les flèches
                const navElement = document.createElement('div');
                navElement.className = 'modal-navigation';
                navElement.innerHTML = `
                    <button class="modal-prev" id="modalPrev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="modal-next" id="modalNext">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                `;
                imageContainer.appendChild(navElement);
                
                // Ajouter la classe pour les images multiples
                if (sectionData.images.length > 1) {
                    imageContainer.classList.add('multiple-images');
                } else {
                    imageContainer.classList.remove('multiple-images');
                }
                
                sectionData.images.forEach((imageData, index) => {
                    // Gérer les images avec ou sans titre
                    const imageSrc = typeof imageData === 'string' ? imageData : imageData.src;
                    const imageTitle = typeof imageData === 'string' ? `${sectionData.title} ${index + 1}` : imageData.title;
                    
                    // Créer un wrapper pour chaque image
                    const imageWrapper = document.createElement('div');
                    imageWrapper.className = 'modal-image-wrapper';
                    
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = imageTitle;
                    img.className = 'modal-image';
                    
                    // Ajouter la fonctionnalité de zoom au clic
                    img.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        showZoomedImage(imageSrc, imageTitle);
                    });
                    
                    imageWrapper.appendChild(img);
                    
                    // Ajouter un titre sur l'image
                    const imageTitleDiv = document.createElement('div');
                    imageTitleDiv.className = 'modal-image-title';
                    imageTitleDiv.textContent = imageTitle;
                    imageWrapper.appendChild(imageTitleDiv);
                    
                    // Bouton de téléchargement flottant sur l'image
                    const downloadBtn = document.createElement('button');
                    downloadBtn.className = 'modal-image-download';
                    downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
                    downloadBtn.title = `Télécharger ${imageTitle}`;
                    downloadBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Utiliser les informations de téléchargement spécifiques à l'image
                        const downloadUrl = imageData.downloadUrl || imageSrc;
                        const downloadName = imageData.downloadName || imageTitle;
                        downloadImage(downloadUrl, downloadName);
                    });
                    imageWrapper.appendChild(downloadBtn);
                    
                    // Ajouter le wrapper au conteneur
                    imageContainer.appendChild(imageWrapper);
                });
                
                
                // Toujours réattacher les event listeners aux flèches
                const currentModalPrev = imageContainer.querySelector('.modal-prev');
                const currentModalNext = imageContainer.querySelector('.modal-next');
                
                if (currentModalPrev) {
                    // Supprimer tous les anciens event listeners
                    const newPrev = currentModalPrev.cloneNode(true);
                    currentModalPrev.parentNode.replaceChild(newPrev, currentModalPrev);
                    newPrev.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Prev clicked, current section:', currentProjectSection);
                        changeSection('prev');
                    });
                }
                
                if (currentModalNext) {
                    // Supprimer tous les anciens event listeners
                    const newNext = currentModalNext.cloneNode(true);
                    currentModalNext.parentNode.replaceChild(newNext, currentModalNext);
                    newNext.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Next clicked, current section:', currentProjectSection);
                        changeSection('next');
                    });
                }
            }
            
            // Afficher le modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Attendre que le modal soit affiché avant de manipuler les éléments
            setTimeout(() => {
                // Mettre à jour l'état actif de la navigation
                projectNavLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`[data-section="${section}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }, 100);
        }
    }
    
    // Fonction pour fermer le modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentProjectSection = null;
    }
    
    // Fonction pour changer de section
    function changeSection(direction) {
        console.log('=== changeSection called ===');
        console.log('Direction:', direction);
        console.log('Current section:', currentProjectSection);
        console.log('Modal exists:', !!modal);
        console.log('Modal active:', modal?.classList.contains('active'));
        
        if (!currentProjectSection) {
            console.log('❌ No current project section');
            return;
        }
        
        if (!modal) {
            console.log('❌ No modal element');
            return;
        }
        
        // Déterminer quelle base de données utiliser
        let currentSectionOrder;
        if (currentProjectSection.startsWith('nature-')) {
            currentSectionOrder = natureSectionOrder;
        } else if (currentProjectSection.startsWith('cuisine-')) {
            currentSectionOrder = cuisineSectionOrder;
        } else if (currentProjectSection.startsWith('studio-')) {
            currentSectionOrder = studioSectionOrder;
        } else if (currentProjectSection.startsWith('menuiserie-')) {
            currentSectionOrder = menuiserieSectionOrder;
        } else {
            currentSectionOrder = sectionOrder;
        }
        
        const currentIndex = currentSectionOrder.indexOf(currentProjectSection);
        console.log('Current index in sectionOrder:', currentIndex);
        console.log('Section order:', currentSectionOrder);
        
        if (currentIndex === -1) {
            console.log('❌ Section not found in sectionOrder');
            return;
        }
        
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % currentSectionOrder.length;
        } else {
            newIndex = (currentIndex - 1 + currentSectionOrder.length) % currentSectionOrder.length;
        }
        
        const newSection = currentSectionOrder[newIndex];
        console.log('New index:', newIndex);
        console.log('New section:', newSection);
        console.log('Calling openModal...');
        
        openModal(newSection);
        console.log('=== changeSection completed ===');
    }
    
    
    // Fonction pour télécharger une image individuelle
    function downloadImage(imageSrc, fileName) {
        // Créer un lien de téléchargement temporaire
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = fileName;
        link.target = '_blank';
        link.style.display = 'none';
        
        // Ajouter le lien au DOM, cliquer dessus, puis le supprimer
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Fonction pour attacher les event listeners aux liens de navigation
    function attachProjectNavListeners() {
        // Attendre un peu pour s'assurer que le DOM est prêt
        setTimeout(() => {
            const allProjectNavLinks = document.querySelectorAll('.project-nav-link');
            console.log('Attaching listeners to', allProjectNavLinks.length, 'navigation links');
            allProjectNavLinks.forEach((link, index) => {
                console.log(`Link ${index}:`, link.getAttribute('data-section'));
                // Supprimer les anciens event listeners
                link.removeEventListener('click', handleProjectNavClick);
                // Ajouter le nouvel event listener
                link.addEventListener('click', handleProjectNavClick);
                
                // Ajouter des styles pour s'assurer que les animations fonctionnent
                link.style.cursor = 'pointer';
                link.style.transition = 'all 0.3s ease';
            });
        }, 50);
    }
    
    // Fonction pour gérer les clics sur les liens de navigation
    function handleProjectNavClick(e) {
        console.log('Navigation link clicked:', e.currentTarget);
        e.preventDefault();
        const section = e.currentTarget.getAttribute('data-section');
        console.log('Opening modal for section:', section);
        openModal(section);
    }
    
    // Fonction de debug pour vérifier l'état des éléments
    function debugProjectNavLinks() {
        const allProjectNavLinks = document.querySelectorAll('.project-nav-link');
        console.log('=== DEBUG PROJECT NAV LINKS ===');
        console.log('Total links found:', allProjectNavLinks.length);
        allProjectNavLinks.forEach((link, index) => {
            console.log(`Link ${index}:`, {
                element: link,
                dataSection: link.getAttribute('data-section'),
                classes: link.className,
                hasClickListener: link.onclick !== null,
                computedStyle: window.getComputedStyle(link).cursor
            });
        });
        console.log('=== END DEBUG ===');
    }
    
    // Attacher les event listeners initiaux
    attachProjectNavListeners();
    
    // Debug initial
    setTimeout(() => {
        debugProjectNavLinks();
    }, 100);
    
    // Event listeners pour le modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Initial Prev clicked, current section:', currentProjectSection);
        changeSection('prev');
    });
    modalNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Initial Next clicked, current section:', currentProjectSection);
        changeSection('next');
    });
    
    // Défilement avec la molette pour les images multiples
    function initModalWheelScroll() {
        const modalImageContainer = document.querySelector('.modal-image-container.multiple-images');
        
        if (modalImageContainer) {
            // Supprimer l'ancien event listener s'il existe
            modalImageContainer.removeEventListener('wheel', handleWheelScroll);
            
            // Ajouter le nouvel event listener
            modalImageContainer.addEventListener('wheel', handleWheelScroll, { passive: false });
        }
    }
    
    // Fonction de gestion du défilement à la molette
    function handleWheelScroll(e) {
        // Empêcher le défilement vertical de la page
        e.preventDefault();
        
        // Défilement horizontal plus fluide
        const scrollAmount = e.deltaY * 0.8; // Réduire la vitesse pour plus de contrôle
        this.scrollLeft += scrollAmount;
    }
    
    // Initialiser le défilement à la molette
    initModalWheelScroll();
    
    // Réinitialiser le défilement quand la modale s'ouvre
    const originalOpenModal = openModal;
    openModal = function(section) {
        originalOpenModal(section);
        // Réinitialiser le défilement après un court délai pour s'assurer que le DOM est mis à jour
        setTimeout(() => {
            initModalWheelScroll();
        }, 100);
    };
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                changeSection('prev');
                break;
            case 'ArrowRight':
                changeSection('next');
                break;
        }
    });
    
    // Initialiser
    updateProgress();
    updateArrows();
    updateNavbarActive();
    
    // Attacher les event listeners pour la navigation des projets
    attachProjectNavListeners();
    
    // Gestion de la navbar avec clic
    const navbarToggle = document.querySelector('.navbar-toggle');
    const sideNavbar = document.querySelector('.side-navbar');
    
    if (navbarToggle && sideNavbar) {
        navbarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sideNavbar.classList.toggle('active');
        });
        
        // Fermer la navbar quand on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!sideNavbar.contains(e.target)) {
                sideNavbar.classList.remove('active');
            }
        });
        
        // Fermer la navbar quand on clique sur un lien
        const navbarItems = document.querySelectorAll('.navbar-item');
        navbarItems.forEach(item => {
            item.addEventListener('click', () => {
                sideNavbar.classList.remove('active');
            });
        });
    }
    
    // Fonction d'animation pour la section Contact
    function animateContactElements() {
        // Animation du titre CONTACT
        setTimeout(() => {
            const portfolioTitle = document.querySelector('#contact-section .portfolio-title');
            const portfolioLine = document.querySelector('#contact-section .portfolio-line');
            
            if (portfolioTitle) {
                portfolioTitle.style.opacity = '0';
                portfolioTitle.style.transform = 'translateY(20px)';
                portfolioTitle.style.transition = 'all 0.8s ease-out';
                
                setTimeout(() => {
                    portfolioTitle.style.opacity = '1';
                    portfolioTitle.style.transform = 'translateY(0)';
                }, 100);
            }
            
            if (portfolioLine) {
                portfolioLine.style.width = '0';
                portfolioLine.style.transition = 'width 1s ease-out';
                
                setTimeout(() => {
                    portfolioLine.style.width = '200px';
                }, 100);
            }
        }, 200);
        
        // Animation des lignes de contact
        setTimeout(() => {
            const contactLines = document.querySelectorAll('#contact-section .contact-line');
            contactLines.forEach((line, index) => {
                line.style.opacity = '0';
                line.style.transform = 'scale(0)';
                line.style.transition = 'all 0.8s ease-out';
                
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'scale(1)';
                }, 100 + (index * 200));
            });
        }, 400);
        
        // Animation de la ligne d'information de contact
        setTimeout(() => {
            const contactInfoLine = document.querySelector('#contact-section .contact-info-line');
            if (contactInfoLine) {
                contactInfoLine.style.width = '0';
                contactInfoLine.style.transition = 'width 1s ease-out';
                
                setTimeout(() => {
                    contactInfoLine.style.width = '120px';
                }, 100);
            }
        }, 600);
        
        // Animation des éléments de contact
        setTimeout(() => {
            const contactDetailItems = document.querySelectorAll('#contact-section .contact-detail-item');
            contactDetailItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';
                item.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 200));
            });
        }, 800);
        
        // Animation du message "Merci"
        setTimeout(() => {
            const thankYouText = document.querySelector('#contact-section .contact-thank-you-text');
            const thankYouLine = document.querySelector('#contact-section .contact-thank-you-line');
            
            if (thankYouText) {
                thankYouText.style.opacity = '0';
                thankYouText.style.transform = 'translateY(20px)';
                thankYouText.style.transition = 'all 0.8s ease-out';
                
                setTimeout(() => {
                    thankYouText.style.opacity = '1';
                    thankYouText.style.transform = 'translateY(0)';
                }, 100);
            }
            
            if (thankYouLine) {
                thankYouLine.style.width = '0';
                thankYouLine.style.transition = 'width 1s ease-out';
                
                setTimeout(() => {
                    thankYouLine.style.width = '80px';
                }, 100);
            }
        }, 1600);
    }
    
    // Observer pour la section Contact - Animation à chaque visite comme la première section
    const contactSection = document.getElementById('contact-section');
    let isContactAnimating = false;
    let lastContactAnimationTime = 0;
    
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isContactAnimating) {
                    const currentTime = Date.now();
                    // Éviter les animations trop rapprochées (minimum 2 secondes)
                    if (currentTime - lastContactAnimationTime < 2000) {
                        return;
                    }
                    
                    isContactAnimating = true;
                    lastContactAnimationTime = currentTime;
                    
                    // Lancer l'animation
                    animateContactElements();
                    
                    // Réinitialiser le flag après l'animation (3 secondes)
                    setTimeout(() => {
                        isContactAnimating = false;
                    }, 3000);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-100px 0px -100px 0px'
        });
        
        contactObserver.observe(contactSection);
    }
    
    // Gestion des collapses pour la section CV
    function initCVCollapses() {
        const collapseHeaders = document.querySelectorAll('.cv-collapse-header');
        
        collapseHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const content = document.getElementById(targetId);
                const icon = this.querySelector('.cv-collapse-icon');
                
                if (content && icon) {
                    // Toggle de la classe active
                    this.classList.toggle('active');
                    content.classList.toggle('active');
                    
                    // Animation de l'icône
                    if (this.classList.contains('active')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    }
    
    // Initialiser les collapses CV
    initCVCollapses();
    
    // Gestion des collapses pour la navigation des projets
    function initProjectNavCollapses() {
        const projectNavHeaders = document.querySelectorAll('.project-nav-collapse-header');
        
        projectNavHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const content = document.getElementById(targetId);
                const icon = this.querySelector('.project-nav-collapse-icon');
                
                if (content && icon) {
                    // Toggle de la classe active
                    this.classList.toggle('active');
                    content.classList.toggle('active');
                    
                    // Animation de l'icône
                    if (this.classList.contains('active')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    }
    
    // Initialiser les collapses de navigation des projets
    initProjectNavCollapses();
    
    // Gestion de la navbar quand une modale est ouverte
    function initModalNavbarControl() {
        const modal = document.getElementById('projectModal');
        const navbarToggle = document.querySelector('.navbar-toggle');
        const navbarMenu = document.querySelector('.navbar-menu');
        
        if (modal && navbarToggle && navbarMenu) {
            // Observer les changements de classe de la modale
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (modal.classList.contains('active')) {
                            // Modale ouverte - masquer complètement la navbar
                            navbarToggle.style.display = 'none';
                            navbarMenu.style.display = 'none';
                        } else {
                            // Modale fermée - réafficher la navbar
                            navbarToggle.style.display = 'flex';
                            navbarMenu.style.display = 'flex';
                        }
                    }
                });
            });
            
            // Observer les changements de classe de la modale
            observer.observe(modal, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
    
    // Initialiser le contrôle de la navbar avec les modales
    initModalNavbarControl();
});
