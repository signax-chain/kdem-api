const Admin = require("../models/Admin");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { createUser } = require("../config/firebase");
const Roles = require("../models/Types/Roles");

router.post("/", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await createUser(req);
    const data = {
      uid: user.user_id,
      admin_id: req.body.admin_id,
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    };
    const admin = await Admin.create(data);
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      _id: req.params.adminId,
    });
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/account/:id", async (req, res) => {
  try {
    let accounts = [];
    if (req.query.isAdmin === "true") {
      accounts = await Admin.find({ admin_id: req.params.id });
    } else {
      accounts = await Admin.find({ uid: req.params.id });
    }

    if (accounts.length > 0) {
      const role = await Roles.findById(accounts[0].role);
      accounts[0].role_type = role.role;
    }
    res.status(200).send(accounts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
