// // path.join(__dirname,
// app.use("/upload", express.static("upload"));
const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const imageDir = "/upload";

router.get("/:name", (req, res) => {
  const name = req.params.name;
  const filePath = path.join(imageDir, name);

  const options = { root: path.join("") };
  // // read the file
  // fs.readFile(filePath, (err, data) => {
  //   if (err) {
  //     // handle the error (e.g., file could not be read)
  //     res.sendStatus(500);
  //     return;
  //   }

  //   // set the content type of the response to "image/jpeg" (or whatever the file type is)
  //   res.set("Content-Type", "image/jpeg", "image/png");

  //   // send the file data in the response
  //   res.send(data);
  // });

  res.sendFile(filePath, options, function (err) {
    if (err) {
      throw err;
    } else {
      console.log("file sent successfully");
    }
  });
});

module.exports = router;
