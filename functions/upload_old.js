// /functions/upload.js
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const { fileUrl, title, desc, category, type } = body;

    // Save metadata to uploads.json
    const uploadsFile = path.join(__dirname, "..", "data", "uploads.json");
    const uploads = JSON.parse(fs.readFileSync(uploadsFile, "utf-8"));
    uploads.push({ url: fileUrl, title, desc, category, type });
    fs.writeFileSync(uploadsFile, JSON.stringify(uploads, null, 2));

    return { statusCode: 200, body: JSON.stringify({ success: true, url: fileUrl }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: err.message }) };
  }
};