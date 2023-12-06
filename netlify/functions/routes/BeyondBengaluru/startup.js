const router = require('express').Router()
const validator = require('../../middlewares/validator')
const { createUser, deleteUser } = require('../../config/firebase')
const Startup = require('../../models/BeyondBengaluru/startup')
const User = require('../../models/user')
const Role = require('../../models/Types/Roles')
const fs = require('fs')

router.get('/', validator, async (req, res) => {
  try {
    const startup = await Startup.find()
    res.status(200).send(startup)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post('/', validator, async (req, res) => {
  try {
    let id = ''
    let final = ''
    req.body.password = `beyondBengaluru_${req.body.name
      .substring(0, 4)
      .trim()}`
    const createdUser = await createUser(req)
    if (createdUser.success) {
      const role = await Role.findOne({ role: 'startup' })
      const user = new User({
        user_id: createdUser.user_id,
        role: role._id,
        email: req.body.email,
      })
      fs.readFile(`${__dirname}/status.txt`, 'utf-8', async (err, data) => {
        if (err) throw err
        let count = parseInt(data)
        const incr = ++count
        if (incr < 10) {
          final = `0${incr}`
          id = `BB23${req.body.name
            .substring(0, 3)
            .trim()
            .toUpperCase()}${final}`
        } else {
          final = incr
          id = `BB23${req.body.name
            .substring(0, 3)
            .trim()
            .toUpperCase()}${incr}`
        }
        fs.writeFile(`${__dirname}/status.txt`, `${final}`, (error) => {
          if (error) throw error
          console.log('The file has been saved!')
        })
        const startup = new Startup({
          name: req.body.name,
          sector: req.body.sector,
          district: req.body.district,
          founder: {
            name: req.body.founder.name,
            email: req.body.founder.email,
            contact: req.body.founder.contact,
            designation: req.body.founder.designation,
          },
          email: req.body.email,
          contact: req.body.contact,
          address: req.body.address,
          companyType: req.body.companyType,
          hasCIN: req.body.hasCIN,
          CIN: req.body.CIN,
          isRegisteredWithStartupKarnataka:
            req.body.isRegisteredWithStartupKarnataka,
          isRegisteredWithDPIIT: req.body.isRegisteredWithDPIIT,
          profile: req.body.profile,
          bbId: id,
          password: req.body.password,
          isVerified: req.body.isVerified,
          firebaseId: createdUser.user_id,
          dpiitNumber: req.body.dpiitNumber,
          startupKarnatakaRegisterNumber:
            req.body.startupKarnatakaRegisterNumber,
        })
        await startup.save()
        await user.save()
        res.status(200).send(startup)
      })
    } else {
      res.status(500).send(createdUser.error)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.get('/:id', validator, async (req, res) => {
  try {
    const startup = await Startup.findOne({
      _id: req.params.id,
    })
    res.status(200).send(startup)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get('/profile/:id', validator, async (req, res) => {
  try {
    const startup = await Startup.findOne({
      firebaseId: req.params.id,
    })
    res.status(200).send(startup)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.put('/:id', validator, async (req, res) => {
  try {
    const updatedStartup = await Startup.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
    )
    res.status(200).send(updatedStartup)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.delete('/:id', validator, async (req, res) => {
  try {
    const deletedStartup = await Startup.findOneAndDelete({
      _id: req.params.id,
    })
    if(deletedStartup){
      req.params.id = deletedStartup.firebaseId;
      await deleteUser(req)
      res.status(200).send(deletedStartup)
    }else{
      res.status(500).json({
        message: "Something Went Wrong"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

module.exports = router
