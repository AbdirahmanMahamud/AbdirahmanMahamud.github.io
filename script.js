document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');
    const searchInput = document.getElementById('shelf-search');

    // Tab Switching Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active style from all tabs
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');

            // Hide all grids
            grids.forEach(grid => grid.classList.add('hidden'));
            
            // Show only the selected grid
            const target = tab.getAttribute('data-shelf');
            document.getElementById(`${target}-grid`).classList.remove('hidden');

            // Update the counter label
            const labels = {
                'books': '131 BOOKS',
                'movies': '42 MOVIES',
                'travel': '12 LOCATIONS',
                'essays': '6 ESSAYS'
            };
            itemCount.innerText = labels[target];
        });
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const activeGrid = document.querySelector('.shelf-content:not(.hidden)');
        const items = activeGrid.children;

        Array.from(items).forEach(item => {
            const text = item.innerText.toLowerCase();
            const imgAlt = item.querySelector('img')?.alt.toLowerCase() || "";
            
            if (text.includes(term) || imgAlt.includes(term)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});
