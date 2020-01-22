const express = require("express");
const router = express.Router();

//@route  GET api/upload
router.get("/", (req, res) => res.send("Upload route"));
//@desc   Test route
//@access Public
module.exports = router;
