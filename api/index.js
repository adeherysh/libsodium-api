const express = require("express");
const bodyParser = require("body-parser");
const sodium = require("tweetsodium");
const app = express();

function encrypt(value, key) {
  try {
    const messageBytes = Buffer.from(value);
    const keyBytes = Buffer.from(key, "base64");
    const encryptedBytes = sodium.seal(messageBytes, keyBytes);

    return Buffer.from(encryptedBytes).toString("base64");
  } catch (e) {
    console.log(e.message);
    return `Errors: ${e.message}`;
  }
}

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/encrypt", (req, res) => {
  const { secret_value, public_key } = req.body;
  const data = encrypt(secret_value, public_key);
  res.json({
    data: data
  });
});

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to libsodium api tools"
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

module.exports = app;
