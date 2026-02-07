const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const newItem = JSON.parse(event.body);

    const dataPath = path.join(process.cwd(), "data", "uploads.json");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(raw);

    data.push(newItem);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};