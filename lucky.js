let allExperimentsCache = [];
const categories = ['plants', 'animals', 'humans', 'other'];

async function fetchAllExperiments() {
    if (allExperimentsCache.length > 0) {
        return allExperimentsCache;
    }

    const fetchPromises = categories.map(cat =>
    fetch(`${cat}.json`)
    .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${cat}.json`);
        return response.json();
    })
    .then(data => data.map(exp => ({ ...exp, category: cat })))
    .catch(error => {
        console.warn(error.message);
        return [];
    })
    );

    try {
        const results = await Promise.all(fetchPromises);
        allExperimentsCache = results.flat();
        return allExperimentsCache;
    } catch (error) {
        console.error("Error fetching all experiments:", error);
        return [];
    }
}

async function handleLuckyClick() {
    const luckyButton = document.querySelector('.lucky-button');
    const originalText = luckyButton.textContent;
    luckyButton.textContent = 'Finding...';
    luckyButton.disabled = true;

    const allExperiments = await fetchAllExperiments();

    if (allExperiments.length === 0) {
        alert("Sorry, couldn't load the experiment data. Please check the JSON files and try again.");
        luckyButton.textContent = originalText;
        luckyButton.disabled = false;
        return;
    }

    const randomIndex = Math.floor(Math.random() * allExperiments.length);
    const randomExperiment = allExperiments[randomIndex];

    window.location.href = `category.html?cat=${randomExperiment.category}&lucky=${randomExperiment.id}`;
}
