document.addEventListener('DOMContentLoaded', () => {
    const categoryInfo = {
        plants: {
            title: "Plants"
        },
        animals: {
            title: "Animals"
        },
        humans: {
            title: "Humans"
        },
        other: {
            title: "Other"
        }
    };

    let currentExperiments = [];
    let allCards = [];
    let activeTagFilter = '';
    let currentSearchTerm = '';

    const searchInput = document.getElementById('header-search');
    const experimentGrid = document.getElementById('experiment-grid');
    const categoryTitleEl = document.getElementById('category-title');
    const categorySubtitleEl = document.getElementById('category-subtitle');
    const modalOverlay = document.getElementById('experiment-modal');
    const modalCloseButton = document.querySelector('.modal-close-button');
    const filterStatusBar = document.getElementById('filter-status-bar');
    const activeFilterDisplay = document.getElementById('active-filter-display');
    const clearFilterButton = document.getElementById('clear-filter-button');
    const quickFilterTags = document.querySelectorAll('.quick-filter-tags .tag');

    function initializePage() {
        runEntranceAnimation();
        const urlParams = new URLSearchParams(window.location.search);
        const categoryKey = urlParams.get('cat') || 'plants';
        const searchTermFromURL = urlParams.get('search');
        const luckyId = urlParams.get('lucky');

        fetchExperimentData(categoryKey)
        .then(data => {
            currentExperiments = data;
            renderPageContent(categoryKey);

            if (searchTermFromURL) {
                searchInput.value = searchTermFromURL;
                currentSearchTerm = searchTermFromURL.toLowerCase().trim();
                updateFilters();
            }

            if (luckyId) {
                // anim fix
                setTimeout(() => {
                    showModal(luckyId);
                }, 800);
            }
        })
        .catch(error => {
            console.error("Error loading experiment data:", error);
            displayError(categoryKey);
        });

        const luckyButton = document.querySelector('.lucky-button');
        if (luckyButton) {
            luckyButton.addEventListener('click', handleLuckyClick);
        }
    }

    async function fetchExperimentData(categoryKey) {
        const response = await fetch(`${categoryKey}.json`);
        if (!response.ok) {
            throw new Error(`Network response was not ok for ${categoryKey}.json`);
        }
        return response.json();
    }

    function renderPageContent(categoryKey) {
        const info = categoryInfo[categoryKey];
        if (!info) {
            displayError(categoryKey);
            return;
        }

        document.title = `Category: ${info.title} - Cellstronaut`;
        categoryTitleEl.innerHTML = `Category: <span class="highlight-text">${info.title}</span>`;
        categorySubtitleEl.style.display = 'none';

        experimentGrid.innerHTML = '';
        currentExperiments.forEach(exp => {
            const card = document.createElement('div');
            card.className = 'experiment-card';
            card.dataset.experimentId = exp.id;
            card.dataset.tags = exp.tags.join(',');

            card.innerHTML = `
            <h2 class="card-exp-title">${exp.title}</h2>
            <p class="card-exp-summary">${exp.short_summary}</p>
            <div class="card-exp-tags">
            ${exp.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('')}
            </div>
            `;
            experimentGrid.appendChild(card);
        });

        allCards = document.querySelectorAll('.experiment-card');
        gsap.set(allCards, { autoAlpha: 0, y: 30 });
        gsap.to(allCards, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" });

        updateFilters();
    }

    function displayError(categoryKey) {
        categoryTitleEl.innerHTML = `Category <span class="highlight-text">${categoryKey}</span> Not Found`;
        categorySubtitleEl.textContent = "Please check the category name or make sure the corresponding .json file exists and is not empty.";
        experimentGrid.innerHTML = '';
    }

    function updateFilters() {
        allCards.forEach(card => {
            const cardTitle = card.querySelector('.card-exp-title').textContent.toLowerCase();
            const cardSummary = card.querySelector('.card-exp-summary').textContent.toLowerCase();
            const cardTags = card.dataset.tags || '';

            const matchesSearch = currentSearchTerm === '' || cardTitle.includes(currentSearchTerm) || cardSummary.includes(currentSearchTerm);
            const matchesTag = !activeTagFilter || cardTags.split(',').includes(activeTagFilter);

            card.classList.toggle('hidden', !(matchesSearch && matchesTag));
        });
    }

    function showModal(experimentId) {
        const exp = currentExperiments.find(e => e.id === experimentId);
        if (!exp) return;

        const modalContent = modalOverlay.querySelector('.modal-content');

        modalOverlay.querySelector('.modal-title').textContent = exp.title;
        modalOverlay.querySelector('.modal-full-summary').textContent = exp.full_summary || exp.long_summary || "No detailed summary available.";
        modalOverlay.querySelector('.modal-img').src = exp.image || 'img/placeholder-plant.jpg';
        modalOverlay.querySelector('.modal-source-link').href = exp.link || exp.source_link || '#';

        const tagsContainer = modalOverlay.querySelector('.modal-tags');
        tagsContainer.innerHTML = exp.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('');

        const findingsList = modalOverlay.querySelector('.modal-findings-list');
        findingsList.innerHTML = exp.key_findings.map(finding => `<li>${finding}</li>`).join('');

        modalOverlay.style.display = 'flex';
        gsap.from(modalContent, { y: 30, autoAlpha: 0, duration: 0.4, ease: "power3.out" });
    }

    function hideModal() {
        const modalContent = modalOverlay.querySelector('.modal-content');
        gsap.to(modalContent, {
            y: 30,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power3.in",
            onComplete: () => {
                modalOverlay.style.display = 'none';
                modalContent.removeAttribute('style');
            }
        });
    }

    function applyTagFilter(tag) {
        activeTagFilter = tag;
        filterStatusBar.classList.remove('hidden');
        activeFilterDisplay.textContent = tag;
        activeFilterDisplay.dataset.tag = tag;
        updateFilters();
    }

    function clearTagFilter() {
        activeTagFilter = '';
        filterStatusBar.classList.add('hidden');
        updateFilters();
    }

    searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.toLowerCase().trim();
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('search', searchTerm);
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
            currentSearchTerm = searchTerm;
            updateFilters();
        }
    });

    experimentGrid.addEventListener('click', e => {
        const card = e.target.closest('.experiment-card');
        const tag = e.target.closest('.tag');

        if (tag && card) {
            e.stopPropagation();
            applyTagFilter(tag.dataset.tag);
        } else if (card) {
            showModal(card.dataset.experimentId);
        }
    });

    quickFilterTags.forEach(tag => {
        tag.addEventListener('click', () => applyTagFilter(tag.dataset.tag));
    });

    clearFilterButton.addEventListener('click', clearTagFilter);
    modalCloseButton.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) hideModal();
    });

        function runEntranceAnimation() {
            gsap.set(['header', '.category-header', '.filter-toolbar'], { autoAlpha: 0, y: 30 });
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to('header', { y: 0, autoAlpha: 1, duration: 1 })
            .to('.category-header', { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.7")
            .to('.filter-toolbar', { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6");
        }

        let toastTimeout;
        function showToast(message) {
            const toast = document.getElementById('toast-notification');
            if (!toast) return;
            toast.textContent = message;
            toast.classList.add('show');
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 3000);
        }

        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                if (option.dataset.lang === 'ua') {
                    showToast("Coming soon! Sorry for the inconvenience.");
                }
            });
        });

        initializePage();
});
