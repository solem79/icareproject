// counter.js (SAFE VERSION)
(function () {

  document.addEventListener('DOMContentLoaded', () => {

    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    counters.forEach(counter => {
      const target = Number(counter.dataset.counter);
      if (isNaN(target)) return;

      let current = 0;
      const step = Math.max(1, Math.floor(target / 150));

      function animate() {
        current += step;
        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = current;
          requestAnimationFrame(animate);
        }
      }

      animate();
    });

  });

})();