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
    } else {
      // client.replyMessage(event.replyToken, 
      //   {
      //     "type": "template",
      //     "altText": "This is a buttons template",
      //     "template": {
      //         "type": "buttons",
      //         "thumbnailImageUrl": "https://pbs.twimg.com/profile_images/1084270206938099712/qR9TdPQD_400x400.jpg",
      //         "imageAspectRatio": "rectangle",
      //         "imageSize": "cover",
      //         "imageBackgroundColor": "#00FDFD",
      //         "title": "Kunnapat Thippayapalaphonkul",
      //         "text": "Please select",
      //         "defaultAction": {
      //             "type": "uri",
      //             "label": "View detail",
      //             "uri": "http://google.com/"
      //         },
      //         "actions": [
      //             {
      //               "type": "datetimepicker",
      //               "label": "Select date",
      //               "data": "stroeId=12345",
      //               "mode": "datetime",
      //               "inital": "2019-02-02t00:00",
      //               "max":"2025-01-01t23:59",
      //               "min":"2019-02-02t00:00"
      //             },
      //             {
      //               "type": "uri",
      //               "label": "Facebook",
      //               "uri": "https://www.facebook.com/folk.kunnapat"
      //             },
      //             {
      //               "type": "uri",
      //               "label": "CPE",
      //               "uri": "http://cpe.eng.cmu.ac.th/2013/"
      //             }
      //         ]
      //     }
      //   })
      client.replyMessage(event.replyToken, {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                  "thumbnailImageUrl": "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png/revision/latest?cb=20150808131630",
                  "imageBackgroundColor": "#FFFFFF",
                  "title": "this is menu",
                  "text": "description",
                  "actions": [
                      {  
                          "type":"cameraRoll",
                          "label":"Camera roll"
                      },
                      {  
                        "type":"location",
                        "label":"Location"
                     }
                  ]
                },
                {
                  "thumbnailImageUrl": "https://c.76.my/Malaysia/line-brown-bear-cute-pencil-case-ubiyo-1802-02-Ubiyo@6.jpg",
                  "imageBackgroundColor": "#000000",
                  "title": "this is menu",
                  "text": "description",
                  "actions": [
                    {
                      "type":"datetimepicker",
                      "label":"Select date",
                      "data":"storeId=12345",
                      "mode":"datetime",
                      "initial":"2017-12-25t00:00",
                      "max":"2018-01-24t23:59",
                      "min":"2017-12-25t00:00"
                    },
                    {  
                      "type":"camera",
                      "label":"Camera"
                   }
                ]
                }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
      })
    }
  }
})

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})