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

app.post('/webhook', middleware(config), (req, res) => { // req = require to bot | res = response to user
  res.send('Hello!!')
  const event = req.body.events[0];

  if (event.type === 'message') {
    const message = event.message;
    console.log(message)
    if ( message.type === 'sticker' ){
      client.replyMessage(event.replyToken, {
        type: 'sticker',
        stickerId: message.stickerId ,
        packageId: message.packageId
      })
    } else if ( message.type === 'template'){
      client.replyMessage(event.replyToken, 
        {
          "type": "template",
          "altText": "This is a buttons template",
          "template": {
              "type": "buttons",
              "thumbnailImageUrl": "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png/revision/latest?cb=20150808131630",
              "imageAspectRatio": "rectangle",
              "imageSize": "cover",
              "imageBackgroundColor": "#FFFFFF",
              "title": "Menu",
              "text": "Please select",
              "defaultAction": {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://google.com/"
              },
              "actions": [
                  {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                  },
                  {
                    "type": "message",
                    "label": "Add to cart",
                    "text": "no no no"
                  },
                  {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://google.com"
                  }
              ]
          }
        })
    }

    } else {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: message.type // object message | message.text show text | message.type show type
      })
    }
  }
})

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})