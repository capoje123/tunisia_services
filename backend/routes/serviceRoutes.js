const express = require("express");
const { validator, serviceRules } = require("../middlewares/validator");

const { cloudinary } = require("../utils/cloudinary");
const Profile = require("../models/Profile");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const Service = require("../models/Service");
const { get } = require("mongoose");

router.get("/test", (req, res) => {
  res.send("router service test");
});

//add service
router.post("/addservice", isAuth(), async (req, res) => {
  console.log("req.body", req.body);
  try {
    const newService = new Service(req.body);
    newService.user = req.user._id;
    await newService.save();
    const response = await User.updateOne(
      { _id: req.user._id },
      { hasService: true }
    );
    res.send({ msg: "new service added", newService });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error });
  }
});

//get current user service

router.get("/currentservice", isAuth(), async (req, res) => {
  try {
    const currentService = await Service.findOne({
      user: req.user._id,
    })
      .populate("user", "firstName lastName email")
      .populate("profile");
    res.send(currentService);
  } catch (error) {
    res.status(400).send("error");
  }
});

//upload multiple images

router.put("/uploadimages", isAuth(), async (req, res) => {
  const urls = [];
  try {
    for (let i = 0; i < req.body.length; i++) {
      const imageString = req.body[i];
      const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: `${req.user.firstName}-${req.user.lastName}-gallery-images`,
      });
      urls.push(uploadResponse.secure_url);
    }
    console.log(urls);
  } catch (error) {
    console.log(error);
  }
  try {
    const oldService = await Service.findOne({ user: req.user._id });
    oldService.images = [...oldService.images, ...urls];
    await oldService.save();
    res.send({ msg: "images successfully added" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error });
  }
});

//delete image

router.put("/deleteimage", isAuth(), async (req, res) => {
  const imageUrl = req.body.imageUrl;
  console.log("imageUrl", imageUrl);
  try {
    const updatedService = await Service.findOne({ user: req.user._id });
    console.log("updatedService", updatedService);
    updatedService.images = updatedService.images.filter(
      (img) => img !== imageUrl
    );
    await updatedService.save();

    res.send({ msg: "picture deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// get row services

router.get("/services", async (req, res) => {
  const categories = req.query.category
    ? req.query.category.split(",").slice(0, 4)
    : []; // Split the comma-separated categories and get the first 4
  try {
    if (categories.length != 0) {
      const services = await Service.aggregate([
        { $match: { profession: { $in: categories } } },
        {
          $group: {
            _id: "$profession",
            services: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            services: { $slice: ["$services", 6] },
          },
        },
        { $unwind: "$services" },
        {
          $lookup: {
            from: "users", // Assuming the collection name for the User model is 'users'
            localField: "services.user",
            foreignField: "_id",
            as: "services.user",
          },
        },
        {
          $lookup: {
            from: "profiles", // Assuming the collection name for the Profile model is 'profiles'
            localField: "services.profile",
            foreignField: "_id",
            as: "services.profile",
          },
        },
        { $unwind: "$services.user" },
        { $unwind: "$services.profile" },
        {
          $replaceRoot: {
            newRoot: "$services",
          },
        },
      ]);

      res.send(services);
    } else {
      const service = await Service.find()
        .populate("user", "firstName lastName email createdOn")
        .populate("profile");
      res.send(service);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error });
  }
});
// get all service
router.get("/search", async (req, res) => {
  const { city, profession, rating } = req.query;

  try {
    let profileQuery = {};

    if (city) {
      profileQuery.city = city.toLocaleLowerCase();
    }

    const profileIds = await Profile.find(profileQuery, "_id").lean();

    const serviceQuery = {
      profile: { $in: profileIds },
    };

    if (profession) {
      serviceQuery.profession = profession.toLocaleLowerCase();
    }

    if (rating) {
      serviceQuery.totalRating = { $gte: parseInt(rating) };
    }

    const results = await Service.find(serviceQuery)
      .populate("profile", "-__v")
      .populate("user", "firstName lastName email createdOn")
      .lean();

    res.send(results);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//get one user service

router.get("/userservice/:userid", async (req, res) => {
  const userId = req.params.userid;
  try {
    const service = await Service.findOne({ user: userId })
      .populate("user", "firstName lastName email createdOn")
      .populate("profile");
    res.send(service);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//update service

router.put("/updateservice", isAuth(), async (req, res) => {
  try {
    const service = await Service.updateOne(
      { user: req.user._id },
      { ...req.body }
    );
    if (!service.modifiedCount) {
      return res.status(400).send({ msg: "service already updated" });
    }
    res.send({ msg: "service updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
/////unfollow
router.put("/unfollow/:userId", isAuth(), async (req, res) => {
  const myId = req.user._id;
  const userId = req.params.userId;
  try {
    const response = await Service.updateOne(
      { user: userId },
      { $pull: { followers: myId } }
    );
    if (!response.modifiedCount) {
      return res.status(400).send({ msg: "profile alrady unfolowed" });
    }
    const reponse2 = await Service.updateOne(
      { user: myId },
      { $pull: { following: userId } }
    );
    res.send({ msg: "you unfollowed this profile" });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});
/// follow
router.put("/follow/:userId", isAuth(), async (req, res) => {
  const myId = req.user._id;
  const userId = req.params.userId;
  console.log(myId);
  console.log(userId);
  try {
    const followedUser = await Service.findOne({ user: userId });
    if (followedUser.followers.indexOf(myId) !== -1) {
      res.status(400).send({ msg: "profile alrady folowed" });
    } else {
      const response = await Service.updateOne(
        { user: userId },
        { $push: { followers: myId } }
      );
      if (!response.modifiedCount) {
        return res.status(400).send({ msg: "profile alrady folowed" });
      }
      const reponse2 = await Service.updateOne(
        { user: myId },
        { $push: { following: userId } }
      );
      res.send({ msg: "you following this profile" });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//rating

router.put("/rating", isAuth(), async (req, res) => {
  try {
    const { serviceId, ratingNumber } = req.body;
    const user = req.user;

    const service = await Service.findOne({ _id: serviceId });

    const userIndex = service.rating.findIndex((item) =>
      item.userId.equals(user._id)
    );

    if (userIndex !== -1) {
      // User exists, update rating
      const oldRating = service.rating[userIndex].rating;
      service.rating[userIndex].rating = ratingNumber;
      service.totalRating = service.totalRating - oldRating + ratingNumber;
      console.log("Rating updated successfully");
    } else {
      // User doesn't exist, add new rating
      service.rating.push({ userId: user._id, rating: ratingNumber });
      service.totalRating += ratingNumber;
    }

    await service.save();

    res.send(service);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
router.get("/followres/:serviceId", isAuth(), async (req, res) => {
  const serviceId = req.params.serviceId;
  console.log(serviceId);
  try {
    const response = await Service.findOne({ _id: serviceId });
    console.log(response);
    const followeresServices = await Service.find({
      user: { $in: response.followers },
    })
      .select("-rating -images -followers -following -profession -totalRating")
      .populate("user", "firstName lastName")
      .populate("profile", "profileImg");
    res.send(followeresServices);
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
});
//get Following
router.get("/following/:serviceId", isAuth(), async (req, res) => {
  const serviceId = req.params.serviceId;
  console.log(serviceId);
  try {
    const response = await Service.findOne({ _id: serviceId });
    console.log(response);
    const followingServices = await Service.find({
      user: { $in: response.following },
    })
      .select("-rating -images -followers -following -profession -totalRating")
      .populate("user", "firstName lastName")
      .populate("profile", "profileImg");
    res.send(followingServices);
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
});
module.exports = router;
