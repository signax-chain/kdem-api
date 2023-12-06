const router = require('express').Router()
const validator = require('../../middlewares/validator')
const Certificate = require('../../models/BeyondBengaluru/certificate')

router.get('/', validator, async (req, res) => {
  try {
    const response = await Certificate.find()
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:startupId', validator, async (req, res) => {
  try {
    const id = req.params.startupId
    const response = await Certificate.find({
      user_id: id,
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', validator, async (req, res) => {
  try {
    const body = req.body
    const certificate = new Certificate({
      title: body.title,
      description: body.description,
      user_id: body.user_id,
      files: body.files,
      date: Date.now(),
    })
    const response = await certificate.save()
    res.status(200).send(response)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

router.get('/unread', validator, async (req, res) => {
  try {
    const response = await Notification.find({
      read: false,
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
