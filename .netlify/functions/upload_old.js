const fetch = require("node-fetch"); // if needed for fetch in Node
const FormData = require("form-data");

const CLOUD_NAME = "dqsnwbzuh";
const UPLOAD_PRESET = "unsigned_upload";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const { fileBase64, type, title, desc, category } = body;

    // Convert base64 to Buffer
    const buffer = Buffer.from(fileBase64, "base64");

    const form = new FormData();
    form.append("file", buffer, { filename: "upload.png" });
    form.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
      method: "POST",
      body: form
    });
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        fileUrl: data.secure_url,
        type,
        title,
        desc,
        category
      })
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};