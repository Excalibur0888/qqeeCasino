document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Анимация иконки бургер-меню
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (spans.length >= 3) {
                if (mainNav.classList.contains('active')) {
                    // Анимация в крестик
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                } else {
                    // Вернуть в исходное состояние
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
        
        // Закрывать меню при клике на пункт меню
        const menuItems = mainNav.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    
                    // Вернуть иконку в исходное состояние
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    if (spans.length >= 3) {
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
            });
        });
    }
    
    // Category search functionality
    const searchInput = document.querySelector('.search-container input');
    const categoriesList = document.getElementById('categoriesList');
    
    if (searchInput && categoriesList) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const categoryItems = categoriesList.querySelectorAll('li');
            
            categoryItems.forEach(item => {
                const categoryName = item.querySelector('.label').textContent.toLowerCase();
                if (categoryName.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // Clear search when clicking the search button
        const searchButton = document.querySelector('.search-container button');
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                searchInput.value = '';
                const categoryItems = categoriesList.querySelectorAll('li');
                categoryItems.forEach(item => {
                    item.style.display = 'block';
                });
            });
        }
    }
    
    // Category sorting functionality
    const sortCategoriesBtn = document.getElementById('sortCategoriesBtn');
    
    if (sortCategoriesBtn && categoriesList) {
        let sortOrder = 'desc'; // Start with descending order (highest to lowest)
        
        sortCategoriesBtn.addEventListener('click', () => {
            // Toggle sort order
            sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            
            // Toggle active class for visual feedback
            sortCategoriesBtn.classList.toggle('active');
            
            // Get all category items
            const categoryItems = Array.from(categoriesList.querySelectorAll('li'));
            
            // Sort items based on count number
            categoryItems.sort((a, b) => {
                const countA = parseInt(a.querySelector('.count').textContent);
                const countB = parseInt(b.querySelector('.count').textContent);
                
                if (sortOrder === 'desc') {
                    return countB - countA;
                } else {
                    return countA - countB;
                }
            });
            
            // Clear and reappend sorted items
            while (categoriesList.firstChild) {
                categoriesList.removeChild(categoriesList.firstChild);
            }
            
            categoryItems.forEach(item => {
                categoriesList.appendChild(item);
            });
        });
    }
    
    // Enhanced Hero slider functionality
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let isAnimating = false;
    
    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Reset all slides and dots
        sliderItems.forEach((slide) => {
            slide.classList.remove('active');
        });
        
        sliderDots.forEach((dot) => {
            dot.classList.remove('active');
        });
        
        // Set active slide and dot
        sliderItems[index].classList.add('active');
        sliderDots[index].classList.add('active');
        
        currentSlide = index;
        
        // Allow next animation after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Match this with the CSS transition time
    }
    
    function nextSlide() {
        let next = (currentSlide + 1) % sliderItems.length;
        showSlide(next);
    }
    
    // Add event listeners for dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    if (sliderItems.length > 1) {
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-slide when user interacts with controls
        const pauseAutoSlide = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        };
        
        sliderDots.forEach(dot => dot.addEventListener('click', pauseAutoSlide));
    }
    
    // Ticker animation for winners
    const winnersTicker = document.querySelector('.winners-ticker');
    if (winnersTicker) {
        const winners = winnersTicker.querySelectorAll('.winner');
        let currentWinner = 0;
        
        function rotateTicker() {
            winners.forEach(winner => {
                winner.style.opacity = '0';
                winner.style.transform = 'translateY(10px)';
            });
            
            winners[currentWinner].style.opacity = '1';
            winners[currentWinner].style.transform = 'translateY(0)';
            
            currentWinner = (currentWinner + 1) % winners.length;
        }
        
        // Style the winners for transition
        winners.forEach(winner => {
            winner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            winner.style.opacity = '0';
        });
        
        // Show first winner and start rotation
        if (winners.length > 0) {
            winners[0].style.opacity = '1';
            winners[0].style.transform = 'translateY(0)';
            setInterval(rotateTicker, 3000);
        }
    }
    
    // Hover effects for game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        
        card.addEventListener('mouseenter', () => {
            if (playBtn) {
                playBtn.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (playBtn) {
                playBtn.style.opacity = '0';
            }
        });
    });
    
    // Initialize FAQ toggles if they exist
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // Копирование промокода
    const copyBtn = document.querySelector('.copy-btn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const codeElement = document.querySelector('.bonus-code .code');
            
            if (codeElement) {
                // Создаем временный элемент для копирования
                const tempInput = document.createElement('input');
                tempInput.value = codeElement.textContent;
                document.body.appendChild(tempInput);
                
                // Выделяем и копируем текст
                tempInput.select();
                document.execCommand('copy');
                
                // Удаляем временный элемент
                document.body.removeChild(tempInput);
                
                // Показываем визуальный эффект копирования
                copyBtn.classList.add('copied');
                
                // Изменяем иконку на время
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                
                // Через 2 секунды возвращаем исходное состояние
                setTimeout(function() {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = originalIcon;
                }, 2000);
            }
        });
    }
    
    // Также разрешаем копирование при клике на сам код
    const codeElement = document.querySelector('.bonus-code .code');
    if (codeElement) {
        codeElement.addEventListener('click', function() {
            const copyBtn = document.querySelector('.copy-btn');
            if (copyBtn) {
                copyBtn.click(); // Имитируем клик по кнопке копирования
            }
        });
    }
}); 