const router = require("express").Router();
const FundingRaised = require("../models/FundingRaised");

router.post("/", async (req, res) => {
  try {
    const fundingRaised = await FundingRaised.create(req.body);
    res.send(fundingRaised);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const savedFundingRaised = await FundingRaised.find();
    res.send(savedFundingRaised);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const savedFundingRaised = await FundingRaised.findById(req.params.id);
    res.send(savedFundingRaised);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const savedFundingRaised = await FundingRaised.find({
      user_id: req.params.id,
    });
    res.send(savedFundingRaised);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/incubator/:id", async (req, res) => {
  try {
    const savedFundingRaised = await FundingRaised.find({
      startup: {
        $elemMatch: {
          incubator_id: req.params.id,
        },
      },
    });
    res.send(savedFundingRaised);
  } catch (error) {
    res.send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const savedFundingRaised = await FundingRaised.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(savedFundingRaised);
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const savedFundingRaised = await FundingRaised.findByIdAndDelete(
      req.params.id
    );
    res.send(savedFundingRaised);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
