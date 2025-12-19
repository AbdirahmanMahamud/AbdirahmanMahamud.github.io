document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');
    const searchInput = document.getElementById('shelf-search');
    const filterAllBtn = document.getElementById('filter-all');
    const filterCoreBtn = document.getElementById('filter-core');

    let currentMode = 'all'; 

    function applyFilters() {
        const query = searchInput.value.toLowerCase();
        const activeTab = document.querySelector('.nav-tab-active').getAttribute('data-shelf');
        const activeGrid = document.getElementById(`${activeTab}-grid`);
        const items = activeGrid ? activeGrid.querySelectorAll('.shelf-item') : [];
        
        let visibleCount = 0;

        items.forEach(item => {
            const title = (item.getAttribute('data-title') || "").toLowerCase();
            const desc = (item.getAttribute('data-description') || "").toLowerCase();
            
            // NEW FIX: Check for the data-core="true" attribute
            const isCore = item.getAttribute('data-core') === 'true';

            const matchesSearch = title.includes(query) || desc.includes(query);
            const matchesToggle = (currentMode === 'all') || (currentMode === 'core' && isCore);

            if (matchesSearch && matchesToggle) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        if (itemCount) {
            itemCount.innerText = `${visibleCount} ${activeTab.toUpperCase()}`;
        }
    }

    // Tab Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');
            grids.forEach(g => g.classList.add('hidden'));
            const target = tab.getAttribute('data-shelf');
            if(document.getElementById(`${target}-grid`)) {
                document.getElementById(`${target}-grid`).classList.remove('hidden');
            }
            searchInput.value = "";
            applyFilters();
        });
    });

    // Search Logic
    searchInput.addEventListener('input', applyFilters);

    // Core Filter Logic
    filterAllBtn.addEventListener('click', () => {
        currentMode = 'all';
        filterAllBtn.className = "px-3 py-1 bg-[#2d5a27] text-white transition-colors";
        filterCoreBtn.className = "px-3 py-1 border border-[#2d5a27] hover:bg-[#2d5a27] hover:text-white transition-colors";
        applyFilters();
    });

    filterCoreBtn.addEventListener('click', () => {
        currentMode = 'core';
        filterCoreBtn.className = "px-3 py-1 bg-[#2d5a27] text-white transition-colors";
        filterAllBtn.className = "px-3 py-1 border border-[#2d5a27] hover:bg-[#2d5a27] hover:text-white transition-colors";
        applyFilters();
    });

    // Modal Logic
    const modal = document.getElementById('details-modal');
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.shelf-item');
        if (item) {
            document.getElementById('modal-title').innerText = item.getAttribute('data-title') || "Untitled";
            document.getElementById('modal-desc').innerText = item.getAttribute('data-description') || "";
            const img = item.querySelector('img');
            const imgCont = document.getElementById('modal-img-container');
            if (img) {
                document.getElementById('modal-img').src = img.src;
                imgCont.style.display = 'block';
            } else {
                imgCont.style.display = 'none';
            }
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    });

    document.getElementById('close-modal').onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    applyFilters(); // Run on load
});
