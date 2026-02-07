// // (async function () {
// //   const galleryContainer = document.getElementById("galleryContainer");
// //   if (!galleryContainer) return;

// //   try {
// //     const res = await fetch("/data/uploads.json"); // This is your Netlify-hosted metadata
// //     const uploads = await res.json();

// //     galleryContainer.innerHTML = ""; // Clear existing static content

// //     uploads
// //       .filter(item => item.type === "gallery")
// //       .forEach(item => {
// //         const div = document.createElement("div");
// //         div.className = `col-3 filter-item ${item.category}`;
// //         div.innerHTML = `
// //           <a href="${item.fileUrl}" class="lightbox">
// //             <img src="${item.fileUrl}" alt="${item.title}" loading="lazy"/>
// //           </a>
// //           <div class="gallery-info">
// //             <h3>${item.title}</h3>
// //             <p>${item.desc}</p>
// //           </div>
// //         `;
// //         galleryContainer.appendChild(div);
// //       });

// //     setupFilters();

// //   } catch (err) {
// //     console.error("Failed to load gallery:", err);
// //   }

// //   function setupFilters() {
// //     const filterBtns = document.querySelectorAll(".filter-btn");
// //     const items = document.querySelectorAll(".filter-item");

// //     filterBtns.forEach(btn => {
// //       btn.addEventListener("click", () => {
// //         filterBtns.forEach(b => b.classList.remove("active"));
// //         btn.classList.add("active");
// //         const filter = btn.getAttribute("data-filter");

// //         items.forEach(item => {
// //           if (filter === "all" || item.classList.contains(filter)) {
// //             item.style.display = "block";
// //           } else {
// //             item.style.display = "none";
// //           }
// //         });
// //       });
// //     });
// //   }
// // })();

// (function () {
//   const galleryContainer = document.getElementById("galleryContainer");
//   if (!galleryContainer) return;

//   const GALLERY_ITEMS = [
//     {
//       category: "projects",
//       url: "https://res.cloudinary.com/dqsnwbzuh/image/upload/v1769840876/gallery/project1.jpg",
//       title: "Residential Roofing",
//       desc: "Roof installed in Accra"
//     },
//     {
//       category: "projects",
//       url: "https://res.cloudinary.com/dqsnwbzuh/image/upload/v1769840876/gallery/project2.jpg",
//       title: "Commercial Roofing",
//       desc: "Stone-coated roofing system"
//     },
//     {
//       category: "products",
//       url: "https://res.cloudinary.com/dqsnwbzuh/image/upload/v1769840876/gallery/product1.jpg",
//       title: "Stone-Coated Tiles",
//       desc: "Durable roofing sheets"
//     }
//   ];

//   function buildGallery() {
//     galleryContainer.innerHTML = "";

//     GALLERY_ITEMS.forEach(item => {
//       const div = document.createElement("div");
//       div.className = `col-3 filter-item ${item.category}`;

//       div.innerHTML = `
//         <a href="${item.url}" class="lightbox">
//           <img src="${item.url}" alt="${item.title}" loading="lazy">
//         </a>
//         <div class="gallery-info">
//           <h3>${item.title}</h3>
//           <p>${item.desc}</p>
//         </div>
//       `;

//       galleryContainer.appendChild(div);
//     });

//     setupFilters();

//     if (typeof initLightbox === "function") {
//       initLightbox();
//     }
//   }

//   function setupFilters() {
//     const buttons = document.querySelectorAll(".filter-btn");
//     const items = document.querySelectorAll(".filter-item");

//     buttons.forEach(btn => {
//       btn.addEventListener("click", () => {
//         buttons.forEach(b => b.classList.remove("active"));
//         btn.classList.add("active");

//         const filter = btn.dataset.filter;

//         items.forEach(item => {
//           item.style.display =
//             filter === "all" || item.classList.contains(filter)
//               ? "block"
//               : "none";
//         });
//       });
//     });
//   }

//   buildGallery();
// })();

(function () {
  const container = document.getElementById("galleryContainer");
  if (!container) return;

  const data = JSON.parse(localStorage.getItem("icareData"));
  if (!data || !data.gallery.length) return;

  container.innerHTML = "";

  data.gallery.forEach(item => {
    const div = document.createElement("div");
    div.className = `col-3 filter-item ${item.category}`;

    div.innerHTML = `
      <a href="${item.url}" class="lightbox">
        <img src="${item.url}" alt="${item.title}">
      </a>
      <div class="gallery-info">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;

    container.appendChild(div);
  });

  if (typeof initLightbox === "function") initLightbox();
})();