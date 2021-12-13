const User = require('../models/User')

const websocket = (ws, req, WSServer) => {
  ws.on('message', (res) => {
    const msg = JSON.parse(res)

    switch (msg?.method) {
      case 'connection':
        connectionHandler(ws, msg, WSServer)
        break;
      case 'message':
        messageHandler(ws, msg, WSServer)
        break;
    }
  })

  
  ws.on('close', () => disconnectHandler(ws, WSServer));
}

const connectionHandler = async (ws, msg, WSServer) => {
  const data = msg.data
  const user = await User.findOneAndUpdate({ _id: data.id }, { online: true })
  ws.id = data.id
  
  const aWss = WSServer.getWss()
  aWss.clients.forEach(client => {
    if (client.id !== data.id) {
      client.send(JSON.stringify({
        method: 'new connect',
        data: {
          companionId: data.id,
        }
      }))
    }
  })
}

const disconnectHandler = async (ws, WSServer) => {
  const aWss = WSServer.getWss()
  const user = await User.findOneAndUpdate({ _id: ws.id }, { online: false})
  aWss.clients.forEach(client => {
    if (client.id !== ws.id) {
      client.send(JSON.stringify({
        method: 'disconnect',
        data: {
          companionId: ws?.id,
        }
      }))
    }
  })
}

const messageHandler = async (ws, msg, WSServer) => {
  const data = msg.data
  const companionId = data.id
  const message = data.message
  const fromId = data.fromId
  // console.log(data)
  const aWss = WSServer.getWss()
  aWss.clients.forEach(client => {
    // console.log(client.id)
    if (client.id === companionId) {
      // console.log('find', client.id)
      client.send(JSON.stringify({
        method: 'new message',
        data: {
          companionId: fromId,
          message: message
        }
      }))
    }
  })
}

module.exports = websocket