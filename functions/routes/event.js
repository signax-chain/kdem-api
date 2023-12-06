const Event = require("../models/Event");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/incubator/:id", async (req, res) => {
  try {
    const events = await Event.find({ incubator_id: req.params.id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/incubator/:id", async (req, res) => {
  try {
    const event = await Event.deleteMany({ incubator_id: req.params.id });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/incubator/:id/stats", async (req, res) => {
  try {
    const events = await Event.find({ incubator_id: req.params.id });
    const eventTypes = [
      "Webinar",
      "Workshop",
      "Conference",
      "Seminar",
      "Masterclass",
      "Speakers",
      "Participants",
    ];
    const eventStats = {};
    eventTypes.forEach((eventType) => {
      eventStats[eventType] = 0;
    });
    eventStats["Total Events"] = events.length;
    events.forEach((event) => {
      if (event.type) eventStats[event.type] += 1;
    });
    await countSpeakers(events, eventStats);
    await countParticipants(events, eventStats);
    res.status(200).json(eventStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

countSpeakers = async (events, eventStats) => {
  const speakers = [];
  events.forEach((event) => {
    if (event.speakers) {
      event.speakers.forEach((speaker) => {
        if (!speakers.includes(speaker)) {
          speakers.push(speaker);
        }
      });
    }
  });
  eventStats["Speakers"] = speakers.length;
};

countParticipants = async (events, eventStats) => {
  let participants = 0;
  events.forEach((event) => {
    if (event.no_of_participants) {
      participants += parseInt(event.no_of_participants);
    }
  });
  eventStats["Participants"] = participants;
};

module.exports = router;
