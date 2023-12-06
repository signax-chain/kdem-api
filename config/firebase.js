var admin = require("firebase-admin");
var serviceAccount = require("./admin_sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const checkJWT = async (req, res, next) => {
  try {
    const jwtToken = req.header("authorization");
    if (!jwtToken) return res.status(401).send("Unauthorized access");
    const token = jwtToken.split(" ")[1];
    await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    if (error.code === "auth/argument-error") {
      res.status(404).json({
        message: "No User details found",
      });
    } else {
      res.status(500).json({
        message: "Something went wrong ",
      });
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password ? req.body.password : "startupcell",
    });
    const data = {
      user_id: user.uid,
      success: true,
    };
    return data;
  } catch (error) {
    const data = {
      user_id: undefined,
      success: false,
      error: error.message,
    };
    return data;
  }
};

const deleteUser = async(req, res, next)=>{
  try {
    const uid =  req.params.id;
    console.log(uid);
    await admin.auth().deleteUser(uid);
  } catch (error) {
    const data = {
      user_id: undefined,
      success: false,
      error: error.message,
    };
    return data;
  }
}
module.exports = { checkJWT, createUser, deleteUser };
