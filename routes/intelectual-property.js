const router = require("express").Router();
const IntelectualProperty = require("../models/IntelectualProperty");

router.post("/", async (req, res) => {
  try {
    const intelectualProperty = await IntelectualProperty.create(req.body);
    res.send(intelectualProperty);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const savedIntelectualProperty = await IntelectualProperty.find();
    res.send(savedIntelectualProperty);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const savedIntelectualProperty = await IntelectualProperty.findById(
      req.params.id
    );
    res.send(savedIntelectualProperty);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const savedIntelectualProperty = await IntelectualProperty.find({
      user_id: req.params.id,
    });
    res.send(savedIntelectualProperty);
  } catch (error) {
    res.send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedIntelectualProperty =
      await IntelectualProperty.findByIdAndUpdate(req.params.id, req.body);
    res.send(updatedIntelectualProperty);
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedIntelectualProperty =
      await IntelectualProperty.findByIdAndDelete(req.params.id);
    res.send(deletedIntelectualProperty);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
