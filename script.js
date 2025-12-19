document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Selectors ---
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');
    const searchInput = document.getElementById('shelf-search');
    const filterAllBtn = document.getElementById('filter-all');
    const filterCoreBtn = document.getElementById('filter-core');

    let currentMode = 'all'; // Tracks if the user selected 'all' or 'core'

    // --- 2. Master Filter Engine (Search + Core) ---
    function applyFilters() {
        const query = searchInput.value.toLowerCase();
        const activeTab = document.querySelector('.nav-tab-active').getAttribute('data-shelf');
        const activeGrid = document.getElementById(`${activeTab}-grid`);
        
        // Target items in the active grid (Books, Movies, etc.)
        const items = activeGrid ? activeGrid.querySelectorAll('.shelf-item') : [];
        
        let visibleCount = 0;

        items.forEach(item => {
            const title = (item.getAttribute('data-title') || "").toLowerCase();
            const desc = (item.getAttribute('data-description') || "").toLowerCase();
            
            // Check if the item is "Core" by looking for the symbol div inside it
            const isCore = item.querySelector('.absolute.top-2.right-2') !== null;

            // Logic: Must match the text search AND the core/all toggle
            const matchesSearch = title.includes(query) || desc.includes(query);
            const matchesToggle = (currentMode === 'all') || (currentMode === 'core' && isCore);

            if (matchesSearch && matchesToggle) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Update the item count display dynamically
        if (itemCount) {
            itemCount.innerText = `${visibleCount} ${activeTab.toUpperCase()}`;
        }
    }

    // --- 3. Tab Switching Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');
            
            grids.forEach(grid => grid.classList.add('hidden'));
            const target = tab.getAttribute('data-shelf');
            const targetGrid = document.getElementById(`${target}-grid`);
            if (targetGrid) targetGrid.classList.remove('hidden');

            // Reset search input when switching tabs for a clean view
            searchInput.value = "";
            applyFilters();
        });
    });

    // --- 4. Search Input Listener ---
    searchInput.addEventListener('input', applyFilters);

    // --- 5. Core Filter Toggle Buttons ---
    filterAllBtn.addEventListener('click', () => {
        currentMode = 'all';
        // Update UI colors
        filterAllBtn.classList.add('bg-[#2d5a27]', 'text-white');
        filterAllBtn.classList.remove('border');
        filterCoreBtn.classList.remove('bg-[#2d5a27]', 'text-white');
        filterCoreBtn.classList.add('border', 'border-[#2d5a27]');
        applyFilters();
    });

    filterCoreBtn.addEventListener('click', () => {
        currentMode = 'core';
        // Update UI colors
        filterCoreBtn.classList.add('bg-[#2d5a27]', 'text-white');
        filterCoreBtn.classList.remove('border');
        filterAllBtn.classList.remove('bg-[#2d5a27]', 'text-white');
        filterAllBtn.classList.add('border', 'border-[#2d5a27]');
        applyFilters();
    });

    // --- 6. Modal (Pop-up) Logic ---
    const modal = document.getElementById('details-modal');
    const modalImg = document.getElementById('modal-img');
    const modalImgContainer = document.getElementById('modal-img-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('close-modal');

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.shelf-item');
        if (item) {
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-description');

            if (img) {
                modalImg.src = img.src;
                modalImgContainer.style.display = 'block';
            } else {
                modalImgContainer.style.display = 'none'; 
            }

            modalTitle.innerText = title || "Untitled";
            modalDesc.innerText = desc || "No description available.";
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Run filters once on page load to set the initial count
    applyFilters();
});
