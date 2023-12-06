const Error = require("../models/Error");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const error = new Error(...req.body);
    const savedError = await error.save();
    res.status(200).send(savedError);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
