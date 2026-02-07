(function () {
  const faqs = document.querySelectorAll('.faq-item');
  if (!faqs.length) return;

  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('active');
    });
  });
})();