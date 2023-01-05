const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// SAUVEGARDE DE L'IMAGES
const imageDir = "/upload";

router.get("/:name", (req, res) => {
  const name = req.params.name;
  const filePath = path.join(imageDir, name);

  const options = { root: path.join("") };

  res.sendFile(filePath, options, function (err) {
    if (err) {
      throw err;
    }
  });
});

router.delete("/:name", (req, res) => {
  const deleteDir = "./upload";

  const name = req.params.name;
  if (name === "default.jpg") {
    return;
  }
  const filePath = path.join(deleteDir, name);

  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }

    res.send("Fichier supprimer avec succes");
  });
});

module.exports = router;
