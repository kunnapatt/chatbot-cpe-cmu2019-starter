const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const app = express()
const Client = require('@line/bot-sdk').Client;

const config = {
  channelAccessToken: 'V3PpZvmuEE3IVUIrRdbmHYhSGXPOZhUDLxL5ZNucw1jVbKf/iXQ+hUT2whGv/JeP/r8Qlldgj5EyrHRoEXNDtogRqW8kaA9gl49dQMKu0Q+Y+vutvUsTCqnaOj1Hob0bT7tSxCqLJh2TdW7ufMAuLQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '9700cb174a737762aeab9d2e7a19132f'
}

const client = new Client(config)

app.get('/', function (req, res) {
  res.send('Hello World!!')
  
})

app.post('/webhook', middleware(config), (req, res) => {
  res.send('Hello!!')
  const event = req.body.events[0];

  if (event.type === 'message') {
    const message = event.message;
    client.replyMessage(event.replyToken, {
      type: 'text',
      text: message.type
    })
  }
})

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})