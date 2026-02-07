// ================== CONFIG ==================
const CLOUD_NAME = "dqsnwbzuh";
const UPLOAD_PRESET = "unsigned_upload";

// ================== CLOUDINARY UPLOAD ==================
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

// ================== SERVER-SIDE SAVE ==================
async function saveToServer(metadata) {
  const form = new FormData();
  for (const key in metadata) {
    form.append(key, metadata[key]);
  }

  const res = await fetch("/.netlify/functions/upload", {
    method: "POST",
    body: form
  });

  if (!res.ok) throw new Error("Save failed");
  return await res.json();
}

// ================== GALLERY UPLOAD ==================
document.getElementById("uploadForm").addEventListener("submit", async e => {
  e.preventDefault();
  const status = document.getElementById("status");
  status.textContent = "Uploading...";

  try {
    const file = e.target.file.files[0];
    const title = e.target.title.value;
    const desc = e.target.desc.value;
    const category = e.target.category.value;

    // 1️⃣ Upload file to Cloudinary
    const upload = await uploadToCloudinary(file);

    // 2️⃣ Send metadata to Netlify function
    await saveToServer({
      type: "gallery",
      fileUrl: upload.secure_url,
      title,
      desc,
      category,
      resource_type: upload.resource_type
    });

    status.textContent = "Gallery upload successful ✔";

    // 3️⃣ Refresh gallery immediately
    if (window.refreshGallery) window.refreshGallery();

  } catch (err) {
    console.error(err);
    status.textContent = "Upload failed ❌";
  }
});

// ================== SLIDER UPLOAD ==================
document.getElementById("sliderUploadForm").addEventListener("submit", async e => {
  e.preventDefault();
  const status = document.getElementById("statusSlider");
  status.textContent = "Uploading...";

  try {
    const file = e.target.file.files[0];
    const title = e.target.title.value;
    const desc = e.target.desc.value;

    // 1️⃣ Upload file to Cloudinary
    const upload = await uploadToCloudinary(file);

    // 2️⃣ Send metadata to Netlify function
    await saveToServer({
      type: "slider",
      fileUrl: upload.secure_url,
      title,
      desc,
      resource_type: upload.resource_type
    });

    status.textContent = "Slider upload successful ✔";

    // 3️⃣ Refresh slider immediately
    if (window.refreshSlider) window.refreshSlider();

  } catch (err) {
    console.error(err);
    status.textContent = "Upload failed ❌";
  }
});