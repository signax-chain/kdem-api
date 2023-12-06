const router = require("express").Router();
const validator = require("../middlewares/validator");
const { checkJWT } = require("../config/firebase");
const Program = require("../models/program");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).send(error);
  }
});

//create new incubator
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  console.log(req.body);
  const program = new Program({
    program_name: req.body.program_name,
    incubator_id: req.body.incubator_id
  });
  try {
    const savedProgram = await program.save();
    res.status(200).send(savedProgram);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific incubator
// TODO:: add jwt token verifier
router.get("/:programId", validator, async (req, res) => {
  try {
    const program = await Program.findOne({
      _id: req.params.programId,
    });
    res.status(200).send(program);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update specific incubator
// TODO:: add jwt token verifier
router.put("/:programId", validator, async (req, res) => {
  try {
    const updatedProgram = await Program.updateOne(
      { _id: req.params.programId },
      {
        $set: {
          program_name: req.body.program_name,
          incubator_id: req.body.incubator_id
        },
      }
    );
    res.status(200).send(updatedProgram);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/:programId", validator, async (req, res) => {
  try {
    const deletedProgram = await Program.deleteOne({
      _id: req.params.programId,
    });
    res.status(200).send(deletedProgram);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// get specific program by incubator
// TODO:: add jwt token verifier
router.get("/incubator/:incubatorId", validator, async (req, res) => {
  try {
    console.log(req.params.incubatorId);
    const program = await Program.find({
      incubator_id: req.params.incubatorId,
    });
    res.status(200).send(program);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/", validator, async (req, res) => {
  try {
    const deletedProgram = await Program.find();
    for (let index = 0; index < deletedProgram.length; index++) {
      const element = deletedProgram[index];
      await Program.deleteOne({_id: element._id});
    }
    res.status(200).send(deletedProgram);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;