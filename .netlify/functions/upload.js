// icareproject/.netlify/functions/upload.js

const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const formData = event.body;

    // Netlify sends POST as base64 when content-type is multipart/form-data
    // So we need to parse manually if needed. Here we assume simple JSON:
    const data = JSON.parse(formData);

    const uploadsPath = path.join(__dirname, "../../data/uploads.json");

    // Read existing data
    let uploads = { gallery: [], slider: [] };
    if (fs.existsSync(uploadsPath)) {
      const fileContent = fs.readFileSync(uploadsPath, "utf8");
      uploads = JSON.parse(fileContent);
    }

    // Add new upload
    if (data.type === "gallery") {
      uploads.gallery.push(data);
    } else if (data.type === "slider") {
      uploads.slider.push(data);
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid type" }),
      };
    }

    // Save back
    fs.writeFileSync(uploadsPath, JSON.stringify(uploads, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Upload saved" }),
    };
  } catch (err) {
    console.error("Error saving upload:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error" }),
    };
  }
};