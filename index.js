const express = require("express");
const serverless = require("serverless-http");
const app = express();
const PORT = 8000;
require("./config/mongo");
const router = express.Router()

const cors = require("cors");
app.use(cors());
app.use(express.json({ extended: true }));

// Routes

const incubatorRef = require("./routes/incubation");
const roleRef = require("./routes/role");
const startupRef = require("./routes/startup");
const founderRef = require("./routes/founder");
const mentorRef = require("./routes/mentor");
const typeRef = require("./routes/institutionType");
const programRef = require("./routes/program");
const userRef = require("./routes/user");
const sectorRef = require("./routes/sectors");
const statsRef = require("./routes/stats");
const activityRef = require("./routes/activity");
const errorLogsRef = require("./routes/error-log");
const adminRef = require("./routes/admin");
const documentRef = require("./routes/document");
const fundingRef = require("./routes/funding");
const eventRef = require("./routes/event");
const performanceRef = require("./routes/performance");
const fundingRaisedRef = require("./routes/funding-raised");
const prototypeRef = require("./routes/prototype");
const partnershipRef = require("./routes/partnership");
const intelectualPropertyRef = require("./routes/intelectual-property");
const connectRef = require("./routes/connect");
const milestoneRef = require("./routes/milestone");
const generalAPIRef = require("./routes/General/base64Convert");

// Beyond bengaluru
const bbStartupRef = require('./routes/BeyondBengaluru/startup');
const bbNotificationRef = require('./routes/BeyondBengaluru/notification');
const bbCertificateRef = require('./routes/BeyondBengaluru/certificate');
const bbEventRef = require('./routes/BeyondBengaluru/events');
const bbSpeakerRef = require('./routes/BeyondBengaluru/speaker');
router.get('/', (req, res)=>{
    res.status(200).send("Initializing API");
});

app.use("/", router);

// api
app.use("/api/incubator", incubatorRef);
app.use("/api/role", roleRef);
app.use("/api/startup", startupRef);
app.use("/api/founder", founderRef);
app.use("/api/mentor", mentorRef);
app.use("/api/type", typeRef);
app.use("/api/program", programRef);
app.use("/api/user", userRef);
app.use("/api/sector", sectorRef);
app.use("/api/stats", statsRef);
app.use("/api/activity", activityRef);
app.use("/api/error-log", errorLogsRef);
app.use("/api/admin", adminRef);
app.use("/api/document", documentRef);
app.use("/api/funding", fundingRef);
app.use("/api/event", eventRef);
app.use("/api/performance", performanceRef);
app.use("/api/funding-raised", fundingRaisedRef);
app.use("/api/prototype", prototypeRef);
app.use("/api/partnership", partnershipRef);
app.use("/api/intellectual-property", intelectualPropertyRef);
app.use("/api/connect", connectRef);
app.use("/api/milestone", milestoneRef);

// Beyond Bengaluru
app.use('/api/BB/startups', bbStartupRef)
app.use('/api/BB/notifications', bbNotificationRef)
app.use('/api/BB/certificates', bbCertificateRef)
app.use('/api/BB/events', bbEventRef);
app.use('/api/BB/speakers', bbSpeakerRef);

// General API
app.use('/api/base64', generalAPIRef)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
module.exports.handler = serverless(app);