const fs = require("fs");
const path = require("path");
const http = require("http");

const server = http.createServer((req, res) => {
  //Get the file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url == "/" ? "index.html" : req.url
  );

  //Get the name of the extension
  let extName = path.extname(filePath);

  //Get the type of content
  let contentType = "text/html";

  switch (extName) {
    case ".js":
      contentType = "text/js";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // When URL cannot be found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "content-Type": "index.html" });
            res.end(content, "utf-8");
          }
        );
      } else {
        // A server error
        res.writeHead(500);
        res.end(`Server Error ${err.code}`);
      }
    } else {
      //It was successful
      res.writeHead(200, { "content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("server running on port " + port);
});
