const router = require("express").Router();
const validator = require("../../middlewares/validator");
const DocumentSchema = require("../../models/BeyondBengaluru/documents");

router.get("/", validator, async (_, res) => {
  try {
    const response = await DocumentSchema.find();
    res.status(200).send(response); 
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
});

router.get("/:startup_id", validator, async (req, res) => {
  try {
    const id = req.params.startup_id;
    const response = await DocumentSchema.find({
      startup_id: id,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
});

router.post("/", validator, async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const documentSchema = new DocumentSchema({
      title: body.title,
      startup_id: body.startup_id,
      files: body.files,
      type: body.type,
      date: Date.now(),
    });
    const response = await documentSchema.save();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
});

module.exports = router