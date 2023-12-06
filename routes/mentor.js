const router = require('express').Router()
const validator = require('../middlewares/validator')
const Mentor = require('../models/mentor')
const { checkJWT, createUser } = require('../config/firebase')
const Role = require('../models/Types/Roles')
const User = require('../models/user')
const Incubator = require('../models/Incubator')

//get all incubator id
router.get('/', validator, async (req, res) => {
  try {
    const mentors = await Mentor.find()
    for (let i = 0; i < mentors.length; i++) {
      const response = await Incubator.findOne({
        incubator_id: mentors[i].incubator_id,
      })
      mentors[i].incubator_name = response.name
    }
    res.status(200).json(mentors)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

//create new incubator
// TODO:: add jwt token verifier
router.post('/', validator, async (req, res) => {
  try {
    const userId = await createUser(req)
    if (userId.success) {
      const role = await Role.findOne({ role: 'mentor' })
      const user = new User({
        user_id: userId.user_id,
        role: role._id.toString(),
        email: req.body.email,
      })
      req.body.role = role._id.toString()
      req.body.mentor_id = userId.user_id
      console.log(req.body)
      const mentor = new Mentor(req.body)
      try {
        const savedMentor = await mentor.save()
        await user.save()
        res.status(200).send(savedMentor)
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).json({ error: 'User already exists' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})

// get specific incubator
// TODO:: add jwt token verifier
router.get('/:mentorId', validator, async (req, res) => {
  try {
    const incubator = await Mentor.findById(req.params.mentorId)
    const response = await Incubator.findOne({
      incubator_id: incubator.incubator_id,
    })
    incubator.incubator_name = response.name
    res.status(200).send(incubator)
  } catch (err) {
    res.status(500).send(err)
  }
})

// update specific incubator
// TODO:: add jwt token verifier
router.put('/:mentorId', validator, async (req, res) => {
  try {
    const updatedMentor = await Mentor.findOneAndUpdate(
      { _id: req.params.mentorId },
      {
        $set: req.body,
      },
    )
    res.status(200).send(updatedMentor)
  } catch (err) {
    res.status(500).send(err)
  }
})

//delete a post
// TODO:: add jwt token verifier
router.delete('/:mentorId', validator, async (req, res) => {
  try {
    const deletedMentor = await Mentor.findOneAndDelete({
      _id: req.params.mentorId,
    })

    res.status(200).send(deletedMentor)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

// get specific mentor from incubator id
// TODO:: add jwt token verifier
router.get('/incubator/:incubatorId', validator, async (req, res) => {
  try {
    const mentor = await Mentor.find({
      incubator_id: req.params.incubatorId,
    })
    res.status(200).send(mentor)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
