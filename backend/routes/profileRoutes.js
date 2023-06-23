const express = require("express");
const { cloudinary } = require("../utils/cloudinary");
const Profile = require("../models/Profile");
const Service = require("../models/Service");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const User = require("../models/User");
const { validator, workerProfileRules } = require("../middlewares/validator");

router.get("/test", (req, res) => {
  res.send("router user test");
});

//create profile

router.post("/createprofile", isAuth(), async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    newProfile.user = req.user._id;
    await newProfile.save();
    const response = await User.updateOne(
      { _id: req.user._id },
      { hasProfile: true }
    );
    res.send([{ msg: "profile added successfully", newProfile }]);
  } catch (error) {
    res.status(400).send([{ msg: error.message }]);
  }
});

//create worker profile and service

router.post("/createworkerprofile", isAuth(), async (req, res) => {
  try {
    const newProfile = new Profile(req.body.profile);
    newProfile.user = req.user._id;
    await newProfile.save();

    const profile = await Profile.findOne({ _id: newProfile._id });
    const newService = new Service(req.body.service);
    newService.profile = profile._id;
    newService.user = req.user._id;
    await newService.save();
    const response = await User.updateOne(
      { _id: req.user._id },
      { hasProfile: true, hasService: true }
    );

    res.send([{ msg: "profile added successfully", newProfile }]);
  } catch (error) {
    res.status(400).send([{ msg: error.message }]);
  }
});

//get profile

router.get("/currentprofile", isAuth(), async (req, res) => {
  try {
    const currentProfile = await Profile.findOne({
      user: req.user._id,
    }).populate("user");
    res.send(currentProfile);
  } catch (error) {
    res.status(400).send([{ msg: error.message }]);
  }
});

//get user profile

router.get("/:profileId", isAuth(), async (req, res) => {
  const profileId = req.params.profileId;
  try {
    const userProfile = await Profile.findOne({
      user: profileId,
    });
    res.send(userProfile);
  } catch (error) {
    res.status(400).send([{ msg: error.message }]);
  }
});

//profile image

router.put("/uploadprofileimage", isAuth(), async (req, res) => {
  try {
    const imageString = req.body.profileImg;
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
      folder: `${req.user.firstName}-${req.user.lastName}-profile-images`,
    });
    const updatedProfile = await Profile.updateOne(
      { user: req.user._id },
      { profileImg: uploadResponse.url }
    ).populate("user");
    if (!updatedProfile.modifiedCount) {
      return res.status(400).send({ msg: "profile picture already updated" });
    }
    res.send({ msg: "profile image succefully updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// update profile

router.put("/Settings", isAuth(), async (req, res) => {
  if (req.body[1].role) {
    return res.status(400).send([{ msg: "unauthorized " }]);
  }
  try {
    const response = await Profile.updateOne(
      { user: req.user._id },
      { ...req.body[0] }
    );
    const response2 = await User.updateOne(
      { _id: req.user._id },
      { ...req.body[1] }
    );

    if (!response.modifiedCount) {
      return res.status(400).send([{ msg: "profile already updated" }]);
    }
    if (!response2.modifiedCount) {
      return res.status(400).send([{ msg: "User already updated" }]);
    }
    res.send([{ msg: "profile successfuly updated" }]);
  } catch (error) {
    res.status(400).send([{ msg: error.message }]);
  }
});

// get workers profile

router.get("/workersprofiles", async (req, res) => {
  try {
    const allProfiles = await Profile.find().populate(
      "user",
      "firstName lastName email role"
    );
    const workersProfile = allProfiles.filter(
      (profile) => profile.user.role == "worker"
    );
    res.send(workersProfile);
  } catch (error) {
    res.status(400).send([{ msg: error.message }]);
  }
});

module.exports = router;
