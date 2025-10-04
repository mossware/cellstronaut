document.addEventListener('DOMContentLoaded', () => {
    const uiStrings = {
        search_placeholder: "Search experiments...",
        lucky_button: "I'm Lucky",
        main_headline: "Explore decades of NASA’s space biology experiments in <span class='highlight-text'>one place.</span>",
        sub_headline: "Humans, plants, animals, and microbes in space — simplified, summarized, and searchable.",
        category_plants: "Plants",
        category_animals: "Animals",
        category_humans: "Humans",
        category_other: "Other",
        cta_title: "What is Space Biology?",
        cta_subtitle: "Discover the science behind keeping life thriving in the final frontier."
    };

    function populateText() {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.dataset.key;
            if (uiStrings[key]) {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = uiStrings[key];
                } else {
                    element.innerHTML = uiStrings[key];
                }
            }
        });
    }

    let toastTimeout;
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    gsap.set(['header', '.main-headline', '.sub-headline', '.category-card', '.cta-section', '.site-footer'], {
        autoAlpha: 0,
        y: 30
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to('header', { y: 0, autoAlpha: 1, duration: 1 })
    .to('.main-headline', { y: 0, autoAlpha: 1, duration: 1 }, "-=0.8")
    .to('.sub-headline', { y: 0, autoAlpha: 1, duration: 1 }, "-=0.8")
    .to('.category-card', { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 }, "-=0.7")
    .to('.cta-section', { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.5")
    .to('.site-footer', { y: 0, autoAlpha: 1, duration: 1 }, "-=0.7");

    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = option.dataset.lang;
            if (selectedLang === 'en') {
                langOptions.forEach(btn => btn.classList.remove('active'));
                option.classList.add('active');
            } else if (selectedLang === 'ua') {
                showToast("Coming soon! Sorry for the inconvenience.");
            }
        });
    });

    // THE FIX handleLuckyClick
    const luckyButton = document.querySelector('.lucky-button');
    if (luckyButton) {
        luckyButton.addEventListener('click', handleLuckyClick);
    }

    const searchInput = document.getElementById('header-search');
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `category.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    });

    populateText();
});
