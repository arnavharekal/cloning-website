const express = require("express");
const https = require("https");
const app = express();

app.get("/*", (req, res, next) => {
  // Construct the target URL with the request path
  const targetUrl = "https://www.coolmathgames.com" + req.path;

  https.get(targetUrl, (resp) => {
    res.statusCode = resp.statusCode; // Set the status code to match the response
    res.contentType(resp.headers["content-type"]); // Set the correct content type
    resp.pipe(res); // Pipe the response to the client
  }).on("error", (err) => {
    console.error("Error making HTTPS request:", err);
    res.status(500).send("An error occurred"); // Handle errors gracefully
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
