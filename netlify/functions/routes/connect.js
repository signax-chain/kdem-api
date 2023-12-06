const router = require("express").Router();
const Connect = require("../models/Connect");

router.post("/", async (req, res) => {
  try {
    const connect = await Connect.create(req.body);
    res.send(connect);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const savedConnect = await Connect.find();
    res.send(savedConnect);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const savedConnect = await Connect.findById(req.params.id);
    res.send(savedConnect);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const savedConnect = await Connect.find({
      user_id: req.params.id,
    });
    res.send(savedConnect);
  } catch (error) {
    res.send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedConnect = await Connect.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(updatedConnect);
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedConnect = await Connect.findByIdAndDelete(req.params.id);
    res.send(deletedConnect);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
