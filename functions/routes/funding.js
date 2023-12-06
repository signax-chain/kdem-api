const Funding = require("../models/Funding");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const funding = await Funding.find();
    res.status(200).send(funding);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const funding = await Funding.create(req.body);
    res.status(200).send(funding);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const funding = await Funding.find({ user_id: req.params.id });
    res.status(200).send(funding);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/year/:year", async (req, res) => {
  try {
    const funding = await Funding.find({ year: req.params.year });
    res.status(200).send(funding);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/total", async (req, res) => {
  try {
    const funding = await Funding.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$recieved" },
        },
      },
    ]);
    res.status(200).send(funding);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/user/:id/year/:year", async (req, res) => {
  try {
    console.log(req.params.id, req.params.year);
    const funding = await Funding.find({
      user_id: req.params.id,
      year: req.params.year,
    });
    res.status(200).send(funding);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const funding = await Funding.findOne({
      _id: req.params.id,
    });
    res.status(200).send(funding);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const funding = await Funding.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).send(funding);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const funding = await Funding.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(funding);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
