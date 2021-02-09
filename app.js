const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')
const { create } = require('domain')
const app = express()

app.use(bodyParser.json())

const Public_Key = 'BADK6PW8_cDnvEWIW_s8WYi2naw7waCkDtfi95jW3k9CV0aydoeTVw9eg0o9DW0dNMZGDlXmsxROyARXb41bSvA'

const Private_Key = 'XMKRVRuoc_f6ThIbhE7EEQSzIIDA6wHbydmgTb0xUa4'

webpush.setVapidDetails('mailto:vivekmethew8@gmail.com', Public_Key, Private_Key)

app.use(express.static(path.join(__dirname, 'public')))

// subscribe routes
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body

    console.log(subscription)

    // Send 201 - created
    res.status(201).json({})

    // create payload
    const payload = JSON.stringify({ title: 'Push Test by Vivek Methew' })

    // Pass the object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => {
        console.log(err)
    })
})

app.listen(3000, () => {
    console.log('Server running on 3000')
})











// const http = require('http').createServer(app)
// const io = require('socket.io')(http)

// app.use(express.static(path.join(__dirname, 'public')))

// let socketsConnected = new Set()
// http.listen(3000, () => {
//     console.log('Server on running ', 3000)

//     io.on('connection', (socket) => {
//         socketsConnected.add(socket.id)
//         console.log('socket connected')
//         socket.on('disconnect', () => {
//             // console.log('Socket disconnected', socket.id)
//             socketsConnected.delete(socket.id)
//             io.emit('disconnected')
//         })
//         socket.on('notications', (data) => {
//             socket.broadcast.emit('send-notifications', data)
//                 // console.log(data)
//         })
//         console.log("Auth Value :", socket.id)
//     })
// })