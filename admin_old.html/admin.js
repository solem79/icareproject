(function () {
  const PASSWORD = "icare@2026"; // CHANGE THIS

  const entered = sessionStorage.getItem("icareAdminAuth");

  if (!entered) {
    const input = prompt("Enter admin password:");
    if (input !== PASSWORD) {
      alert("Access denied");
      location.href = "/";
    } else {
      sessionStorage.setItem("icareAdminAuth", "true");
    }
  }
})();

const CLOUD_NAME = "dqsnwbzuh";
const UPLOAD_PRESET = "unsigned_upload";

/* ---------- HELPERS ---------- */
function getData() {
  return JSON.parse(localStorage.getItem("icareData")) || {
    gallery: [],
    slider: []
  };
}

function saveData(data) {
  localStorage.setItem("icareData", JSON.stringify(data));
}

async function uploadToCloudinary(file) {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: form }
  );

  return await res.json();
}

/* ---------- GALLERY UPLOAD ---------- */
document.getElementById("uploadForm")?.addEventListener("submit", async e => {
  e.preventDefault();

  const status = document.getElementById("status");
  status.textContent = "Uploading...";

  const file = e.target.file.files[0];
  const title = e.target.title.value;
  const desc = e.target.desc.value;
  const category = e.target.category.value;

  const upload = await uploadToCloudinary(file);
  const data = getData();

  data.gallery.push({
    url: upload.secure_url,
    title,
    desc,
    category
  });

  saveData(data);
  status.textContent = "Gallery uploaded ✔";
  e.target.reset();
});

/* ---------- SLIDER UPLOAD ---------- */
document.getElementById("sliderUploadForm")?.addEventListener("submit", async e => {
  e.preventDefault();

  const status = document.getElementById("statusSlider");
  status.textContent = "Uploading...";

  const file = e.target.file.files[0];
  const upload = await uploadToCloudinary(file);
  const data = getData();

  data.slider.push(upload.secure_url);

  saveData(data);
  status.textContent = "Slider uploaded ✔";
  e.target.reset();
});