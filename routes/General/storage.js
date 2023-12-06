const storage = {}

module.exports = {
  addData: (key, value) => {
    storage[key] = value
    return storage
  },
  getData: (key) => {
    return storage[key]
  },
}
