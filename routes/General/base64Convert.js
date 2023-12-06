const router = require('express').Router()
const axios = require('axios').default
const storage = require('./storage')
const validator = require('../../middlewares/validator')

router.post('/', validator, async (req, res) => {
  try {
    const query = req.body.url
    console.log(query)
    const response = await axios.get(query, { responseType: 'arraybuffer' })
    if (response.status === 200) {
      const base64Image = Buffer.from(response.data, 'binary').toString(
        'base64',
      )
      storage.addData('image', base64Image);
      res.status(200).json({ data: `data:image/png;base64,${base64Image}` })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error)
  }
})

router.get('/', validator, async (req, res) => {
  try {
    const key = 'image';
    const retrievedData = storage.getData(key);
    if (!retrievedData) {
      return res.status(404).json({data: 'Data not found'});
    }
    res.status(200).json({data: retrievedData});
  } catch (error) {
    res.status(500).json({ data: `` })
  }
})
module.exports = router
