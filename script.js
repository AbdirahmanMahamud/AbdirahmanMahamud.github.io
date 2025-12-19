document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update Active Tab Styling
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');

            // Hide all grids
            grids.forEach(grid => grid.classList.add('hidden'));
            
            // Show only the selected grid
            const target = tab.getAttribute('data-shelf');
            const targetGrid = document.getElementById(`${target}-grid`);
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
            }

            // Update Label Count
            const labels = {
                'books': '131 BOOKS',
                'movies': '42 MOVIES',
                'travel': '12 LOCATIONS',
                'essays': '6 ESSAYS'
            };
            itemCount.innerText = labels[target] || "";
        });
    });
});
