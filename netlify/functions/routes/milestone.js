const router = require("express").Router();
const Milestone = require("../models/Milestone");

router.post("/", async (req, res) => {
  try {
    const milestone = await Milestone.create(req.body);
    res.send(milestone);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const savedMilestone = await Milestone.find();
    res.send(savedMilestone);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const savedMilestone = await Milestone.findById(req.params.id);
    res.send(savedMilestone);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const savedMilestone = await Milestone.find({
      user_id: req.params.id,
    });
    res.send(savedMilestone);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/incubator/:id", async (req, res) => {
  try {
    const savedMilestone = await Milestone.find({
      incubator_id: req.params.id,
    });

    res.send(savedMilestone);
  } catch (error) {
    res.send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(milestone);
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndDelete(req.params.id);
    res.send(milestone);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
