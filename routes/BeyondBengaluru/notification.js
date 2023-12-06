const router = require('express').Router()
const validator = require('../../middlewares/validator')
const Notification = require('../../models/BeyondBengaluru/notification')

router.get('/', validator, async (req, res) => {
  try {
    const response = await Notification.find()
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', validator, async (req, res) => {
  try {
    const body = req.body
    const notification = new Notification({
      title: body.title,
      description: body.description,
      user_id: body.user_id,
      read: body.read,
      date: Date.now(),
      to_user_id: body.to_userId ? body.to_userId : 'ALL',
      meta: body.meta,
    })
    const response = await notification.save()
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

router.put('/:id', validator, async (req, res) => {
  try {
    const id = req.params.id
    const response = await Notification.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
    )
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/user/:id', validator, async (req, res) => {
  try {
    const response = await Notification.find({
      to_user_id: req.params.id,
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
module.exports = router
