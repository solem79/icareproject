function initNavigation() {
  const menuBtn = document.getElementById('menuBtn');
  const navbar = document.getElementById('navbar');
  const closeBtn = document.getElementById('closeBtn');
  const overlay = document.querySelector('.overlay-wrapper');

  if (!menuBtn || !navbar) return;

  window.menuToggle = function () {
    if (navbar.style.height === "80px") {
      navbar.style.height = "520px";
      navbar.style.background = "var(--primary)";
      closeBtn.style.display = "block";
      menuBtn.style.display = "none";
      overlay.style.display = "block";
    } else {
      navbar.style.height = "80px";
      navbar.style.background = "var(--transparent)";
      closeBtn.style.display = "none";
      menuBtn.style.display = "block";
      overlay.style.display = "none";
    }
  };
}