const router = require("express").Router();
const validator = require("../../middlewares/validator");
const ServiceProviderSchema = require("../../models/BeyondBengaluru/provider");

router.get("/", validator, async (_, res) => {
  try {
    const response = await ServiceProviderSchema.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
});

router.post("/", validator, async (req, res) => {
  try {
    const body = req.body;
    const serviceProviderSchema = new ServiceProviderSchema({
      title: body.title,
      description: body.description,
      eligibility: body.eligibility,
      apply_url: body.apply_url,
      offering_type: body.offering_type,
      thumbnail: body.thumbnail,
      provider: body.provider,
      date: Date.now(),
    });
    const response = await serviceProviderSchema.save();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
});

module.exports = router