const router = require("express").Router();
const validator = require("../middlewares/validator");
const { checkJWT } = require("../config/firebase");
const InstitutionType = require("../models/Types/InstitutionTypes");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {
    const type = await InstitutionType.find();
    res.status(200).json(type);
  } catch (error) {
    res.status(500).send(error);
  }
});

//create new incubator
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  const type = new InstitutionType({
    type: req.body.type,
  });
  try {
    const savedType = await type.save();
    res.status(200).send(savedType);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific incubator
// TODO:: add jwt token verifier
router.get("/:typeId", validator, async (req, res) => {
  try {
    const type = await InstitutionType.findOne({
      _id: req.params.typeId,
    });
    res.status(200).send(type);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update specific incubator
// TODO:: add jwt token verifier
router.put("/:typeId", validator, async (req, res) => {
  try {
    const updatedType = await InstitutionType.updateOne(
      { _id: req.params.typeId },
      {
        $set: {
          type: req.body.type,
        },
      }
    );
    res.status(200).send(updatedType);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/:typeId", validator, async (req, res) => {
  try {
    const deletedType = await InstitutionType.deleteOne({
      _id: req.params.typeId,
    });
    res.status(200).send(deletedType);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.get("/count/data", validator, async (req, res) => {
  try {
    let count = [];
    const types = await InstitutionType.find();
    for (let index = 0; index < types.length; index++) {
      const element = types[index];
      for (let i = 0; i < count.length; i++) {
        const countElement = count[i];
        if (countElement.id === element._id) {
          count[i]['id'] = element._id;
          count[i]['count'] = countElement.count + 1;
        }else{
          count[i]['id'] = element._id;
          count[i]['count'] = 1;
        }
      }
    }
    res.status(200).send(deletedType);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
