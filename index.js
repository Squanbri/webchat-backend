const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/authRouter')
const messageRouter = require('./routes/messageRouter')
const userRouter = require('./routes/userRouter')
const websocketController = require('./websocket/websocketController')
const User = require('./models/User');

const PORT = process.env.PORT || 5000
const DB_URL = 'mongodb+srv://web-chat:1plQ1Bio13l03PVM@cluster0.matya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()
const WSServer = require('express-ws')(app)

app.use(fileUpload({}));
app.use("/", express.static(__dirname));
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter)

app.post('/upload', async function(req, res) {
  const fileExtension = req.files.file.name.split('.')[req.files.file.name.split('.').length - 1]
  const permittedExtensions = ['jpg', 'jpeg', 'png']
  if (permittedExtensions.includes(fileExtension)) {
    req.files.file.mv(`public/avatars/${req.body.owner}.${fileExtension}`);
    const user = await User.findOneAndUpdate({ _id: req.body.owner }, {
      avatar: `avatars/${req.body.owner}.${fileExtension}`
    })
    res.end(req.body.owner);
  } else {
    res.status(500).json({errors: ['Не подходящее расширение']})
  }
});

app.ws('/', (ws, req) => websocketController(ws, req, WSServer))

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
    app.listen(PORT, () => console.log('start'))
  } catch (e) {
    console.log(e)
  }
}

startApp()




















// const expressWs = require('express-ws')
// const WSserver = expressWs(app)
// app.ws('/', (ws, req) => {
//   console.log('Подключение установленно')
//   ws.send('Ты успешно подключился')
//   ws.on('message', (msg) => {
//     console.log(msg)
//   })
// })