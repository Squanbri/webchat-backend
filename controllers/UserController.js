const User = require('../models/User');

class UserController {
  async getAll(req, res) {
    try {
      const users = await User.find()
      const newUsers = users.map(user => new Object({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
        phone: user.phone,
        avatar: user.avatar,
        online: user.online
      }))

      res.json({users: newUsers})
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getUser(req, res) {
    try {
      const { _id } = req.body
      const user = await User.findOne({ _id })
      // console.log(req.body)

      res.json({user: user})
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update(req, res) {
    try {
      const { 
        id,
        firstName, 
        lastName,
        email,
        password,
        phone,
        city
      } = req.body

      const user = await User.findOneAndUpdate({ _id: id }, {
        firstName, 
        lastName,
        email,
        password,
        phone,
        city
      })

      res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new UserController()