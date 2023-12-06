const router = require("express").Router();
const Prototype = require("../models/Prototype");

router.post("/", async (req, res) => {
  try {
    const prototype = await Prototype.create(req.body);
    res.send(prototype);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const savedPrototype = await Prototype.find();
    res.send(savedPrototype);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const savedPrototype = await Prototype.findById(req.params.id);
    res.send(savedPrototype);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const savedPrototype = await Prototype.find({ user_id: req.params.id });
    res.send(savedPrototype);
  } catch (error) {
    res.send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPrototype = await Prototype.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(updatedPrototype);
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPrototype = await Prototype.findByIdAndDelete(req.params.id);
    res.send(deletedPrototype);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
