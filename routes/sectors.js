const router = require("express").Router();
const validator = require("../middlewares/validator");
const Sectors = require("../models/sectors");
const { checkJWT } = require("../config/firebase");

//get all incubator id
router.get("/", validator, async (req, res) => {
  try {
    const sectors = await Sectors.find();
    res.status(200).json(sectors);
  } catch (error) {
    res.status(500).send(error);
  }
});

//create new incubator
// TODO:: add jwt token verifier
router.post("/", validator, async (req, res) => {
  const sector = new Sectors(req.body);
  try {
    const savedSector = await sector.save();
    res.status(200).send(savedSector);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific incubator
// TODO:: add jwt token verifier
router.get("/:sectorId", validator, async (req, res) => {
  try {
    const sector = await Sectors.findOne({
      _id: req.params.sectorId,
    });
    res.status(200).send(sector);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update specific startup founders
// TODO:: add jwt token verifier
router.put("/:sectorId", validator, async (req, res) => {
  try {
    const updatedSectors = await Sectors.updateOne(
      { startup_id: req.params.sectorId },
      {
        $set: {
          sector_name: req.body.sector_name,
        },
      }
    );
    res.status(200).send(updatedSectors);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//delete a post
// TODO:: add jwt token verifier
router.delete("/:sectorId", validator, async (req, res) => {
  try {
    const deletedSector = await Sectors.deleteOne({
      _id: req.params.sectorId,
    });
    res.status(200).send(deletedSector);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
