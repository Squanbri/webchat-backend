const Message = require('../models/Message');

class MessageController {
  async create(req, res) {
    try {
      const { text, from, to } = req.body
      const message = await Message.create({ text, from, to })

      res.json({message: message})
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getLastMessage(req, res) {
    try {
      const { userId1, userId2 } = req.body
      const messages = await Message.findOne().or([
        {from: userId1, to: userId2},
        {from: userId2, to: userId1}
      ])
      .sort({ _id: -1 })
    
      res.json(messages)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getCountUncheckedMessages(req, res) {
    try {
      const { user1, user2 } = req.body
      const count = await Message.count({from: user2, to: user1, check: false})
      
      res.json(count)
    } catch {
      res.status(500).json(e)
    }
  }

  async getDialog(req, res) {
    try {
      const { userId1, userId2 } = req.body

      const messages = await Message.find().or([
        {from: userId1, to: userId2},
        {from: userId2, to: userId1}
      ])
        
      res.json({messages: messages})
    } catch {
      res.status(500).json(e)
    }
  }
}

module.exports = new MessageController()