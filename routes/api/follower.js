const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Follower = require("../../models/Follower");
const User = require("../../models/User");

//@route  Post api/Follower
//@desc   Create or update user follower
//@access Private
router.post("/", [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await User.findById(req.user.id).select("-password");

  const { location, status, youtube, twitter, facebook, instagram } = req.body;

  // Build Profile Object
  const followerFields = {};
  followerFields.user = user.id;
  if (location) followerFields.location = location;
  if (status) followerFields.status = status;

  //Build social object
  followerFields.social = {};
  if (youtube) followerFields.social.youtube = youtube;
  if (twitter) followerFields.social.twitter = twitter;
  if (facebook) followerFields.social.facebook = facebook;
  if (instagram) followerFields.social.instagram = instagram;

  try {
    // Using upsert option (creates new doc if no match is found):
    let followers = await Follower.findOneAndUpdate(
      { user: req.user.id },
      { $set: followerFields },
      { new: true, upsert: true }
    );
    res.json(followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/Follower
// @desc     Get all Followers
// @access   Public
router.get("/", async (req, res) => {
  try {
    const followers = await Follower.find().sort({ date: -1 });
    res.json(followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
