document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update Active Tab UI
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');

            // Hide all grids and show the selected one
            const targetShelf = tab.getAttribute('data-shelf');
            grids.forEach(grid => {
                grid.classList.add('hidden');
                if (grid.id === `${targetShelf}-grid`) {
                    grid.classList.remove('hidden');
                }
            });

            // Update the counter text based on selection
            const labels = {
                'books': '131 BOOKS',
                'movies': '42 MOVIES',
                'travel': '12 LOCATIONS',
                'essays': '6 ESSAYS'
            };
            itemCount.innerText = labels[targetShelf];
        });
    });
});
