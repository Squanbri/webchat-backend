const User = require('../models/User')

class AuthController {
  async login(req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email, password})

      if (!email) {
        // email is null
        res.status(400).json({errors: ['Поле "email" не может быть пустым']})
      }
      else if (!password) {
        // password is null
        res.status(400).json({errors: ['Поле "пароль" не может быть пустым']})
      }

      if (user)
        res.json(user)
      else 
        res.status(400).json({errors: ['Неверный логин или пароль']})
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async registration(req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email})

      if (!email) {
        // email is null
        res.status(400).json({errors: ['Поле "email" не может быть пустым']})
      }
      else if (!password) {
        // password is null
        res.status(400).json({errors: ['Поле "пароль" не может быть пустым']})
      }
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        // isEmail === false
        res.status(400).json({errors: ['Пожалуйста введите коректный email']})
      } else if (user) { 
        // isUnique === false
        res.status(400).json({errors: ['Такой email уже зарегистрирован']})
      } else { 
        // createUser
        const user = await User.create({email, password})
        res.json(user)
      }
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new AuthController()