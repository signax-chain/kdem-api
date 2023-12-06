const router = require("express").Router();
const Partnership = require("../models/Partnership");

router.post("/", async (req, res) => {
  try {
    const partnership = await Partnership.create(req.body);
    res.send(partnership);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const savedPartnership = await Partnership.find();
    res.send(savedPartnership);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const savedPartnership = await Partnership.findById(req.params.id);
    res.send(savedPartnership);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const savedPartnership = await Partnership.find({
      user_id: req.params.id,
    });
    res.send(savedPartnership);
  } catch (error) {
    res.send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPartnership = await Partnership.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.send(updatedPartnership);
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPartnership = await Partnership.findByIdAndDelete(
      req.params.id
    );
    res.send(deletedPartnership);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
