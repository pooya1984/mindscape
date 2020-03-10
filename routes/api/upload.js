const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");

router.use(fileUpload());

router.post("/", auth, (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  const user = req.user.id;
  file.mv(`client/src/img/profilePics/${user}.png`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({
      fileName: user,
      filePath: `/uploads/profilePics/${user}`
    });
  });
});

module.exports = router;
