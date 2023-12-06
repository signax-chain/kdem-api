const router = require("express").Router();
const validator = require("../middlewares/validator");
const Activity = require("../models/activity");
const { checkJWT } = require("../config/firebase");

//get all activity
router.get("/", validator, async (req, res) => {
  try {
    const activity = await Activity.find().sort({createdAt: -1});
    res.status(200).json(activity);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//create a activity
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  const activity = new Activity(req.body);
  try {
    const savedActivity = await activity.save();
    res.status(200).send(savedActivity);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get activity based on id
// TODO:: add jwt token verifier
router.get("/:activityId", validator, async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.activityId,
    });
    res.status(200).send(activity);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific founder from startup
// TODO:: add jwt token verifier
router.get("/type/:activityType", validator, async (req, res) => {
  try {
    const activity = await Activity.find({
      activity_type: req.params.activityType,
    });
    res.status(200).send(activity);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete a activity
// TODO:: add jwt token verifier
router.delete("/:activityId", validator, async (req, res) => {
  try {
    const deletedActivity = await Activity.deleteOne({
      _id: req.params.activityId,
    });
    res.status(200).send(deletedActivity);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//delete a activity
// TODO:: add jwt token verifier
router.delete("/", validator, async (req, res) => {
  try {
    const activity = await Activity.find();
    for (let index = 0; index < activity.length; index++) {
      const element = activity[index];
      await Activity.deleteOne({ _id: element._id });
    }
    res.status(200).send(activity);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// get activity based on incubator id
// TODO:: add jwt token verifier
router.get("/incubator/:incubatorId", validator, async (req, res) => {
  try {
    const activity = await Activity.find({
     incubator_id: req.params.incubatorId,
    });
    res.status(200).send(activity);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
