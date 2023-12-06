const router = require("express").Router();
const validator = require("../middlewares/validator");
const User = require("../models/user");
const { checkJWT } = require("../config/firebase");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//create new incubator
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  const user = new User({
    user_id: req.body.user_id,
    role: req.body.role,
    email: req.body.email,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific founder from startup
// TODO:: add jwt token verifier
router.get("/:userId", validator, async (req, res) => {
  try {
    const user = await User.findOne({
      user_id: req.params.userId,
    });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/:userId", validator, async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({
      user_id: req.params.userId,
    });
    res.status(200).send(deletedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;