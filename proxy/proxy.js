const express = require("express");
const axios = require("axios");
const cors = require("cors");

const BASE_URL = "https://numberwordgenerator20240927020628.azurewebsites.net";
const app = express();

app.use(cors());
app.use(express.json());

app.options("*", async (req, res) => {
  // preflight request
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin ?? "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.sendStatus(204);
});

app.use("*", async (req, res) => {
  let headers = {};
  Object.entries(req.headers).forEach(([key, value]) => {
    if (
      key === "host" ||
      key === "content-length" ||
      key === "referer" ||
      key === "sec-fetch-site" ||
      key === "sec-fetch-dest" ||
      key === "sec-ch-ua" ||
      key === "sec-ch-ua-mobile" ||
      key === "vary" ||
      key === "access-control-allow-origin" ||
      key === "sec-ch-ua-platform" ||
      key == "origin"
    )
      return;
    headers[key] = value;
  });

  try {
    console.log(JSON.stringify({ headers, body: req.body }, null, 2));
    const response = await axios({
      method: req.method,
      url: BASE_URL + req.originalUrl,
      headers: headers,
      data: req.body,
    });

    console.log(
      "RESPONSE\n",
      JSON.stringify(
        {
          enteredUrl: BASE_URL + req.originalUrl,
          requestHeaders: headers,
          status: response.status,
          body: response.data,
        },
        null,
        2
      )
    );
    // Send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching from target URL:", error);
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching data" });
  }
});

app.listen(3001, () => {
  console.log("proxy is listening on port 3001");
});
