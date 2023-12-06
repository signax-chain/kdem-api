const router = require("express").Router();
const validator = require("../middlewares/validator");
const Founder = require("../models/founder");
const { checkJWT } = require("../config/firebase");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {
    const founders = await Founder.find();
    res.status(200).json(founders);
  } catch (error) {
    res.status(500).send(error);
  }
});

//create new incubator
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  const founders = req.body.founders;
  const founder = new Founder({
    incubator_id: req.body.incubator_id,
    startup_id: req.body.startup_id,
    founders: founders,
  });
  try {
    const savedFounder = await founder.save();
    res.status(200).send(savedFounder);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific incubator
// TODO:: add jwt token verifier
router.get("/:founderId", validator, async (req, res) => {
  try {
    const founder = await Founder.findOne({
      _id: req.params.founderId,
    });
    res.status(200).send(founder);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific founder from startup
// TODO:: add jwt token verifier
router.get("/startup/:startupId", validator, async (req, res) => {
  try {
    const founder = await Founder.find({
      startup_id: req.params.startupId,
    });
    res.status(200).send(founder);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific founder from incubator
// TODO:: add jwt token verifier
router.get("/incubator/:incubatorId", validator, async (req, res) => {
  try {
    const founder = await Founder.find({
      incubator_id: req.params.incubatorId,
    });
    res.status(200).send(founder);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update specific startup founders
// TODO:: add jwt token verifier
router.put("/:startupId", validator, async (req, res) => {
  try {
    const updatedFounder = await Founder.updateOne(
      { startup_id: req.params.startupId },
      {
        $set: {
          founders: req.body.founders,
        },
      }
    );
    res.status(200).send(updatedFounder);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/:founderId", validator, async (req, res) => {
  try {
    const deletedFounder = await Founder.deleteOne({
      _id: req.params.founderId,
    });
    res.status(200).send(deletedFounder);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
