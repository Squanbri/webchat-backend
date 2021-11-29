const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter')
const messageRouter = require('./routes/messageRouter')
const userRouter = require('./routes/userRouter')

const PORT = process.env.PORT || 80
const DB_URL = 'mongodb+srv://web-chat:1plQ1Bio13l03PVM@cluster0.matya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter)

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