const router = require("express").Router();
const validator = require("../middlewares/validator");
const { checkJWT } = require("../config/firebase");
const Roles = require("../models/Types/Roles");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {
    const incubators = await Roles.find();
    res.status(200).json(incubators);
  } catch (error) {
    res.status(500).send(error);
  }
});

//create new incubator
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  const role = new Roles({
    role: req.body.role,
  });
  try {
    const savedRole = await role.save();
    res.status(200).send(savedRole);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific incubator
// TODO:: add jwt token verifier
router.get("/:roleId", validator, async (req, res) => {
  try {
    const role = await Roles.findOne({
      _id: req.params.roleId,
    });
    res.status(200).send(role);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update specific incubator
// TODO:: add jwt token verifier
router.put("/:roleId", validator, async (req, res) => {
  try {
    const updatedRole = await Roles.updateOne(
      { _id: req.params.roleId },
      {
        $set: {
          role: req.body.role,
        },
      }
    );
    res.status(200).send(updatedRole);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/:roleId", validator, async (req, res) => {
  try {
    const deletedRole = await Roles.deleteOne({
      _id: req.params.roleId,
    });
    res.status(200).send(deletedRole);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;