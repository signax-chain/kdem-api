const router = require("express").Router();
const validator = require("../middlewares/validator");
const Startup = require("../models/startup");
const Program = require("../models/program");
const { checkJWT, createUser } = require("../config/firebase");
const User = require("../models/user");
const Role = require("../models/Types/Roles");
const Incubator = require("../models/Incubator");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {

    const queryPerPage = req.query ? parseInt(req.query.page) : 50;
    const selectedPage = req.query ? parseInt(req.query.selected) : 1;
    const skip = (selectedPage - 1) * queryPerPage;
    const startup = await Startup.find().skip(skip).limit(queryPerPage);
    for (let index = 0; index < startup.length; index++) {
      const element = startup[index];
      if (element.program_id) {
        const program = await Program.findOne({ _id: element.program_id });
        element.program_name = program.program_name;
      }
      const incubator_details = await Incubator.findOne({
        incubator_id: element.incubator_id,
      });
      element.incubator_details = {
        name: "",
        location: "",
        profile: "",
      };

      if (incubator_details) {
        element.incubator_details.name = incubator_details.name;
        element.incubator_details.location = incubator_details.location;
        element.incubator_details.profile = incubator_details.profile;
      }
      // element.incubator_details.incubator_type = incubator_details.incubator_type;
    }
    res.status(200).send(startup);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//create new incubator
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  try {
    const createdUser = await createUser(req);
    if (createdUser.success) {
      const role = await Role.findOne({ role: "startup" });
      const user = new User({
        user_id: createdUser.user_id,
        role: role._id,
        email: req.body.email,
      });
      const startup = new Startup({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        incubator_id: req.body.incubator_id,
        founders: req.body.founders,
        funding_status: req.body.funding_status,
        no_of_employees: req.body.no_of_employees,
        profile: req.body.profile,
        role: role._id,
        startup_id: createdUser.user_id,
        incubation_date: req.body.incubation_date,
        graduation_date: req.body.graduation_date,
        cohort_month: req.body.cohort_month,
        cohort_year: req.body.cohort_year,
        program_id: req.body.program_id,
        cin_number: req.body.cin_number,
        pan_number: req.body.pan_number,
        gst_number: req.body.gst_number,
        address: req.body.address,
        location: req.body.location,
        team_member: req.body.team_member,
        sector: req.body.sector,
        industry: req.body.industry,
        startup_type: req.body.startup_type,
        linkedin_url: req.body.linkedin_url,
        year_of_establishment: req.body.year_of_establishment,
        password: req.body.password,
      });
      const savedStartup = await startup.save();
      res.status(200).send(savedStartup);
      await user.save();
    } else {
      res.status(400).send(createdUser);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific incubator
// TODO:: add jwt token verifier
router.get("/:id", validator, async (req, res) => {
  try {
    const startup = await Startup.findOne({
      startup_id: req.params.id,
    });
    if (startup.program_id) {
      const program = await Program.findOne({ _id: startup.program_id });
      startup.program_name = program.program_name;
    }
    const incubator = await Incubator.findOne({
      incubator_id: startup.incubator_id,
    });
    if(incubator.profile){
      startup.incubator_profile = incubator.profile;
    }
    startup.incubator_name = incubator.name;
    startup.incubator_location = incubator.location;
    res.status(200).send(startup);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// update specific incubator
// TODO:: add jwt token verifier
router.put("/:id", validator, async (req, res) => {
  try {
    const updatedStartup = await Startup.findOneAndUpdate(
      { startup_id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).send(updatedStartup);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/:id", validator, async (req, res) => {
  try {
    const deletedStartup = await Startup.findOneAndDelete({
      startup_id: req.params.id,
    });
    
    res.status(200).send(deletedStartup);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/incubator/:id", validator, async (req, res) => {
  try {
    const deletedStartup = await Startup.deleteMany({
      incubator_id: req.params.id,
    });
    res.status(200).send(deletedStartup);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// get starup by incubator id
router.get("/incubator/:incubatorId", validator, async (req, res) => {
  try {
    const startup = await Startup.find({
      incubator_id: req.params.incubatorId,
    });
    for (let index = 0; index < startup.length; index++) {
      const element = startup[index];
      if (element.program_id) {
        const program = await Program.findOne({ _id: element.program_id });
        element.program_name = program.program_name;
      }

      const incubator_details = await Incubator.findOne({
        incubator_id: element.incubator_id,
      });
      element.incubator_details = {
        name: "",
        location: "",
        profile: "",
      };
      element.incubator_details.name = incubator_details.name;
      element.incubator_details.location = incubator_details.location;
      element.incubator_details.profile = incubator_details.profile;
    }
    res.status(200).send(startup);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
