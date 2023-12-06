const router = require("express").Router();
const validator = require("../middlewares/validator");
const Incubator = require("../models/Incubator");
const User = require("../models/user");
const Types = require("../models/Types/InstitutionTypes");
const Role = require("../models/Types/Roles");
const Startup = require('../models/startup');
const Mentor = require('../models/mentor');
const { checkJWT, createUser } = require("../config/firebase");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {
    const incubators = await Incubator.find();
    for (let index = 0; index < incubators.length; index++) {
      const element = incubators[index];
      try {
        if (
          element.institution_type_id !== null &&
          element.institution_type_id !== undefined &&
          element.institution_type_id !== ""
        ) {
          const types = await Types.findOne({
            _id: element.institution_type_id,
          });
          element.incubator_type = types.type;
        }
        const roles = await Role.findOne({ _id: element.role });
        element.role_type = roles.role;
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).send(incubators);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//create new incubator
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  try {
    const userId = await createUser(req);
    if (userId.success) {
      const role = await Role.findOne({ role: req.body.role_type });
      const user = new User({
        user_id: userId.user_id,
        role: role._id.toString(),
        email: req.body.email,
      });
      req.body.role = role._id.toString();
      req.body.incubator_id = userId.user_id;
      const incubator = new Incubator(req.body);
      const savedIncubator = await incubator.save();
      await user.save();
      res.status(200).send(savedIncubator);
    } else {
      res.status(400).send({ error: "User already exists" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific incubator
// TODO:: add jwt token verifier
router.get("/:incubatorId", validator, async (req, res) => {
  try {
    const incubator = await Incubator.findOne({
      incubator_id: req.params.incubatorId,
    });
    if (incubator.institution_type_id) {
      const types = await Types.findOne({ _id: incubator.institution_type_id });
      if (types !== null) {
        incubator.incubator_type = types.type;
      }
    }
    const startups = await Startup.find({incubator_id: req.params.incubatorId});
    const mentors = await Mentor.find({incubator_id: req.params.incubatorId});
    const roles = await Role.findOne({ _id: incubator.role });
    incubator.role_type = roles.role;
    incubator.total_startups = startups.length;
    incubator.total_mentors = mentors.length;
    res.status(200).send(incubator);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// update specific incubator
// TODO:: add jwt token verifier
router.put("/:incubatorId", validator, async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const updatedIncubator = await Incubator.updateOne(
      { incubator_id: req.params.incubatorId },
      {
        $set: body,
      }
    );
    res.status(200).send(updatedIncubator);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/:incubatorId", validator, async (req, res) => {
  try {
    const deletedIncubator = await Incubator.deleteOne({
      incubator_id: req.params.incubatorId,
    });
    res.status(200).send(deletedIncubator);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// get incubators based on institution_type
router.get("/type/:incubationType", validator, async (req, res) => {
  try {
    let id = "";
    const type = await Types.find();
    for (let index = 0; index < type.length; index++) {
      const element = type[index];
      if (element.type.includes(req.params.incubationType)) {
        id = element._id;
        break;
      }
    }
    const incubators = await Incubator.find({ institution_type_id: id });
    for (let index = 0; index < incubators.length; index++) {
      const element = incubators[index];
      try {
        const types = await Types.findOne({ _id: element.institution_type_id });
        element.incubator_type = types.type;
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).send(incubators);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
