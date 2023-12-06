const router = require("express").Router();
const Performance = require("../models/Performance");

router.post("/", async (req, res) => {
  try {
    const performance = await Performance.create(req.body);
    res.send(performance);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const savedPerformance = await Performance.find();
    res.json(savedPerformance);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const savedPerformance = await Performance.findById(req.params.id);
    res.json(savedPerformance);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const savedPerformance = await Performance.find({ user_id: req.params.id });
    res.json(savedPerformance);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/year/:year", async (req, res) => {
  try {
    const savedPerformance = await Performance.find({ year: req.params.year });
    res.json(savedPerformance);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/user/:userId/year/:year", async (req, res) => {
  try {
    const savedPerformance = await Performance.find({
      user_id: req.params.userId,
      year: req.params.year,
    });
    res.json(savedPerformance);
  } catch (error) {
    res.json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPerformance = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPerformance);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPerformance = await Performance.findByIdAndDelete(
      req.params.id
    );
    res.json(deletedPerformance);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
