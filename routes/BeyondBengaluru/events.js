const router = require('express').Router()
const validator = require('../../middlewares/validator')
const Events = require('../../models/BeyondBengaluru/events')
const EventResponse = require('../../models/BeyondBengaluru/eventRegister')

router.get('/', validator, async (req, res) => {
  try {
    const events = []
    const response = await Events.find()
    for (let index = 0; index < response.length; index++) {
      const element = response[index]
      const eventResponse = await EventResponse.find({
        event_id: element._id,
      })
      element.responses = eventResponse
      events.push(element)
      if (events.length === response.length) {
        res.status(200).send(events)
      }
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', validator, async (req, res) => {
  try {
    const body = req.body
    if (body) {
      const event = new Events({
        type: body.type,
        title: body.title,
        description: body.description,
        date: body.date,
        time: body.time,
        speakers: body.speakers,
        zoom: body.zoom,
        status: body.status,
        creatorId: body.creatorId,
        createdAt: Date.now(),
        isFeedback: body.isFeedback,
        privacy: body.privacy,
        eventMode: body.eventMode ? body.eventMode : "Online",
        eventLink: body.eventLink ? body.eventLink : "-",
        eventLocation: body.eventLocation ? body.eventLocation : "-"
      })
      const response = await event.save()
      res.status(200).json({ Message: response })
    } else {
      res.status('403').json({ Message: 'Bad Request' })
    }
  } catch (error) {
    res.status(500).json({ Message: error.message })
  }
})

router.get('/:id', validator, async (req, res) => {
  try {
    const startup = await Events.findOne({
      _id: req.params.id,
    })
    res.status(200).send(startup)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.delete('/:id', validator, async (req, res) => {
  try {
    const deletedStartup = await Events.findOneAndDelete({
      _id: req.params.id,
    })
    res.status(200).send(deletedStartup)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

// Event register
router.post('/register', validator, async (req, res) => {
  try {
    const body = req.body
    if (body) {
      const event = new EventResponse({
        createdAt: Date.now(),
        startupName: body.startupName,
        startupDetails: body.startupDetails,
        startup_id: body.startup_id,
        event_id: body.eventId,
      })
      const response = await event.save()
      res.status(200).json({ Message: response })
    } else {
      res.status('403').json({ Message: 'Bad Request' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ Message: error.message })
  }
})
router.get('/register/:eventId', validator, async (req, res) => {
  console.log(event_id)
  try {
    const startup = await EventResponse.find({
      event_id: req.params.eventId,
    })
    res.status(200).send(startup)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
module.exports = router
