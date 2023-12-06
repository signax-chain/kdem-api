const router = require('express').Router()
const validator = require('../../middlewares/validator')
const Speakers = require('../../models/BeyondBengaluru/speaker')

router.get('/', validator, async (req, res) => {
  try {
    const response = await Speakers.find()
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', validator, async (req, res) => {
  try {
    const body = req.body
    if (body) {
      const speaker = new Speakers({
        name: body.name,
        photoURL: body.photoURL,
        designation: body.designation,
        organization: body.organization,
        email: body.email,
        phoneNumber: body.phoneNumber,
        description: body.description,
        creatorId: body.creatorId,
        createdAt: Date.now(),
      })
      const response = await speaker.save()
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
    const speaker = await Speakers.findOne({
      _id: req.params.id,
    })
    res.status(200).send(speaker)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.delete('/:id', validator, async (req, res) => {
  try {
    const deletedSpeaker = await Speakers.findOneAndDelete({
      _id: req.params.id,
    })
    res.status(200).send(deletedSpeaker)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

module.exports = router