const router = require("express").Router();
const validator = require("../middlewares/validator");
const { checkJWT } = require("../config/firebase");
const Incubator = require("../models/Incubator");
const Startups = require("../models/startup");
const Mentors = require("../models/mentor");
const Types = require("../models/Types/InstitutionTypes");
const FundingRaised = require("../models/FundingRaised");
const Prototypes = require("../models/Prototype");
const Milestones = require("../models/Milestone");
const Partnerships = require("../models/Partnership");
const IntelectualProperty = require("../models/IntelectualProperty");
const Connections = require("../models/Connect");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {
    let stats = {
      incubator: 0,
      startup: 0,
      mentor: 0,
      institution_type: {
        COE: 0,
        TBI: 0,
        NAIN: 0,
        "K-WING": 0,
        CIF: 0,
      },
    };
    // get incubators count
    const incubators = await Incubator.find();
    stats.incubator = incubators.length;

    // get total number of startups
    const startups = await Startups.find();
    stats.startup = startups.length;

    // get total number of mentors
    const mentors = await Mentors.find();
    stats.mentor = mentors.length;

    // get total number of COE
    const types = await Types.find();
    for (let index = 0; index < types.length; index++) {
      const data = types[index];
      for (let i = 0; i < incubators.length; i++) {
        const element = incubators[i];
        if (
          data._id.toString() === element.institution_type_id &&
          data.type.includes("COE")
        ) {
          stats.institution_type.COE += 1;
        } else if (
          data._id.toString() === element.institution_type_id &&
          data.type.includes("TBI")
        ) {
          stats.institution_type.TBI += 1;
        } else if (
          data._id.toString() === element.institution_type_id &&
          data.type.includes("NAIN")
        ) {
          stats.institution_type.NAIN += 1;
        } else if (
          data._id.toString() === element.institution_type_id &&
          data.type.includes("K-WING")
        ) {
          stats.institution_type["K-WING"] += 1;
        } else if (
          data._id.toString() === element.institution_type_id &&
          data.type.includes("CIF")
        ) {
          stats.institution_type.CIF += 1;
        }
      }
    }
    res.status(200).json(stats);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/incubator/:id", validator, async (req, res) => {
  try {
    let stats = {
      startups: 0,
      mentors: 0,
    };

    const startups = await Startups.find({ incubator_id: req.params.id });
    stats.startups = startups.length;

    const mentors = await Mentors.find({ incubator_id: req.params.id });
    stats.mentors = mentors.length;

    res.status(200).json(stats);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/performance/:id", validator, async (req, res) => {
  try {
    let stats = {
      fundingRaised: 0,
      prototypes: 0,
      partnerships: 0,
      milestones: 0,
      ipsGenerated: 0,
      connectionsEstablished: 0,
    };

    let documents = [];
    documents = await FundingRaised.find({ user_id: req.params.id });
    stats.fundingRaised = documents.length;

    documents = await Prototypes.find({ user_id: req.params.id });
    stats.prototypes = documents.length;

    documents = await Partnerships.find({ user_id: req.params.id });
    stats.partnerships = documents.length;

    documents = await Milestones.find({ user_id: req.params.id });
    stats.milestones = documents.length;

    documents = await IntelectualProperty.find({ user_id: req.params.id });
    stats.ipsGenerated = documents.length;

    documents = await Connections.find({ user_id: req.params.id });
    stats.connectionsEstablished = documents.length;

    res.status(200).send(stats);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
