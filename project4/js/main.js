/* HAMBURGER */
function initHeader() {

    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".menu-close");

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

    // 아코디언
    const items = mobileMenu.querySelectorAll(".mobile-item");

    items.forEach(item => {
        const title = item.querySelector(".mobile-title");

        title.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            items.forEach(i => i.classList.remove("active"));

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // 바깥 클릭 닫기
    document.addEventListener("click", (e) => {

        const isMenu = e.target.closest(".mobile-menu");
        const isHamburger = e.target.closest(".hamburger");

        if (!isMenu && !isHamburger) {
            mobileMenu.classList.remove("active");
        }
    });
}



/* HERO 슬라이드 */
const slides = document.querySelectorAll('.slide');
const current = document.querySelector('.current');
const total = document.querySelector('.total');

if (slides.length > 0 && current && total) {

    let index = 0;

    total.textContent = slides.length.toString().padStart(2, '0');

    current.textContent = "01";

    setInterval(() => {

        slides[index].classList.remove('active');

        index = (index + 1) % slides.length;

        slides[index].classList.add('active');

        current.textContent = (index + 1).toString().padStart(2, '0');

    }, 3000);
}


/* Travel Style (드래그) */
const slider = document.querySelector('.style-slider');

if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;

        const x = e.pageX;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
}


/* TripInfo (카드/페이지네이션) */
const cards = document.querySelectorAll(".card");
const filters = document.querySelectorAll(".categories a");
const pagination = document.querySelector(".pagination");
const countNum = document.querySelector(".count-num");

if (cards.length > 0 && pagination) {

    let currentFilter = "all";
    let currentPage = 1;
    const itemsPerPage = 9;

    filters.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();

            filters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentFilter = btn.dataset.filter;
            currentPage = 1;

            render();
        });
    });

    function getFilteredCards() {
        if (currentFilter === "all") return [...cards];

        return [...cards].filter(card =>
            card.dataset.category === currentFilter
        );
    }

    function render() {
        const filtered = getFilteredCards();

        if (countNum) {
            countNum.textContent = filtered.length;
        }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        cards.forEach(card => card.style.display = "none");

        filtered.slice(start, end).forEach(card => {
            card.style.display = "block";
        });

        renderPagination(filtered.length);
    }

    function renderPagination(total) {
        const totalPages = Math.ceil(total / itemsPerPage);
        let html = "";

        if (currentPage > 1) {
            html += `<a href="#" class="prev">«</a>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            html += `<a href="#" class="${i === currentPage ? "active" : ""}">${i}</a>`;
        }

        if (currentPage < totalPages) {
            html += `<a href="#" class="next">»</a>`;
        }

        pagination.innerHTML = html;

        pagination.querySelectorAll("a").forEach(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();

                if (btn.classList.contains("prev")) currentPage--;
                else if (btn.classList.contains("next")) currentPage++;
                else currentPage = parseInt(btn.textContent);

                render();
            });
        });
    }

    render();
}
