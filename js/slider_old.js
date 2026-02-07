(function () {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;

  const overlay = slider.querySelector(".overlay");
  const dotsContainer = slider.querySelector(".slider-dots");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  const SLIDER_IMAGES = [
    "https://res.cloudinary.com/dqsnwbzuh/image/upload/v1769790218/slider10_k6yam1.jpg",
    "https://res.cloudinary.com/dqsnwbzuh/image/upload/v1769790219/slider11_abcd.jpg",
    "https://res.cloudinary.com/dqsnwbzuh/image/upload/v1769790220/slider12_efgh.jpg"
  ];

  let slides = [];
  let current = 0;
  let timer;

  function buildSlides() {
    slides = [];
    dotsContainer.innerHTML = "";

    slider.querySelectorAll(".slider-img").forEach(img => img.remove());

    SLIDER_IMAGES.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "slider-img" + (i === 0 ? " active" : "");
      img.alt = `Slide ${i + 1}`;
      img.onerror = () => console.warn("Slider image not found:", src);

      slider.insertBefore(img, overlay.nextSibling);
      slides.push(img);
    });

    buildDots();
    startAuto();
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(i) {
    slides[current].classList.remove("active");
    dotsContainer.children[current].classList.remove("active");

    current = i;

    slides[current].classList.add("active");
    dotsContainer.children[current].classList.add("active");
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  prevBtn?.addEventListener("click", () => {
    prev();
    startAuto();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    startAuto();
  });

  /* ---------- TOUCH / SWIPE ---------- */
  let startX = 0;
  let endX = 0;

  slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchmove", e => {
    endX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchend", () => {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      startAuto();
    }
  });

  buildSlides();
})();