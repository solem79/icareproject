(function () {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;

  const overlay = slider.querySelector(".overlay");
  const dotsContainer = slider.querySelector(".slider-dots");
  let slides = [], current = 0, timer;

  async function loadSlider() {
    try {
      const res = await fetch("/data/uploads.json");
      const uploads = await res.json();
      const sliderImages = uploads
        .filter(item => item.type === "slider")
        .map(i => i.fileUrl);

      buildSlides(sliderImages);
    } catch (err) {
      console.warn("Failed to load slider CMS data", err);
    }
  }

  function buildSlides(images) {
    slides = [];
    slider.querySelectorAll("img.slider-img").forEach(img => img.remove());
    dotsContainer.innerHTML = "";

    images.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "slider-img" + (i === 0 ? " active" : "");
      img.alt = `Slide ${i + 1}`;
      img.onerror = () => console.warn(`Slider image not found: ${src}`);
      if (overlay) slider.insertBefore(img, overlay.nextSibling);
      else slider.insertBefore(img, dotsContainer);
      slides.push(img);
    });

    buildDots();
    startAuto();
  }

  function buildDots() {
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = i === 0 ? "dot active" : "dot";
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function startAuto() { timer = setInterval(nextSlide, 5000); }
  function resetTimer() { clearInterval(timer); startAuto(); }
  function goToSlide(i) {
    slides[current].classList.remove("active");
    dotsContainer.children[current].classList.remove("active");
    current = i;
    slides[current].classList.add("active");
    dotsContainer.children[current].classList.add("active");
  }
  function nextSlide() { goToSlide((current + 1) % slides.length); }
  function prevSlide() { goToSlide((current - 1 + slides.length) % slides.length); }

  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  prevBtn?.addEventListener("click", () => { prevSlide(); resetTimer(); });
  nextBtn?.addEventListener("click", () => { nextSlide(); resetTimer(); });

  // touch support
  let startX = 0, endX = 0;
  slider.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, {passive:true});
  slider.addEventListener("touchmove", e => { endX = e.touches[0].clientX; }, {passive:true});
  slider.addEventListener("touchend", () => {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  });

  loadSlider();
  window.refreshSlider = loadSlider; // <-- refresh hook
})();


/* ---------- GALLERY PART ---------- */
(async function () {
  const galleryContainer = document.getElementById("galleryContainer");
  if (!galleryContainer) return;

  async function loadGallery() {
    try {
      const res = await fetch("/data/uploads.json");
      const uploads = await res.json();

      galleryContainer.innerHTML = ""; // clear

      uploads
        .filter(item => item.type === "gallery")
        .forEach(item => {
          const div = document.createElement("div");
          div.className = `col-3 filter-item ${item.category}`;
          div.innerHTML = `
            <a href="${item.fileUrl}" class="lightbox">
              <img src="${item.fileUrl}" alt="${item.title}" loading="lazy"/>
            </a>
            <div class="gallery-info">
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          `;
          galleryContainer.appendChild(div);
        });

      setupFilters();
    } catch (err) {
      console.error("Failed to load gallery:", err);
    }
  }

  function setupFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".filter-item");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");

        items.forEach(item => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  loadGallery();
  window.refreshGallery = loadGallery; // <-- refresh hook
})();