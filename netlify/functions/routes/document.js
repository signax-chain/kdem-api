const Document = require("../models/Document");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const savedDocument = await Document.create(req.body);
    res.status(200).send({
      message: "Document created successfully",
      data: savedDocument,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating document", error: error, status: 500 });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const documents = await Document.find({ user_id: req.params.id });
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/user/:id/year/:year", async (req, res) => {
  try {
    const documents = await Document.find({
      user_id: req.params.id,
      year: req.params.year,
    });
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/type/:type", async (req, res) => {
  try {
    const documents = await Document.find({ type: req.params.type });
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/user/:id/type/:type", async (req, res) => {
  try {
    const documents = await Document.find({
      user_id: req.params.id,
      type: req.params.type,
    });
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/user/:id/year/:year/type/:type", async (req, res) => {
  try {
    const documents = await Document.find({
      user_id: req.params.id,
      year: req.params.year,
      type: req.params.type,
    });
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).send({
      message: "Document updated successfully",
      data: document,
      status: 200,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating document", error: error, status: 500 });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Document deleted successfully",
      data: deletedDocument,
      status: 200,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting document", error: error, status: 500 });
  }
});

module.exports = router;
