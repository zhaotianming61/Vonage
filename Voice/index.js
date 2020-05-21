require('dotenv').config();
 
const express = require('express'); 
const bodyParser = require('body-parser');
const app = express(); 

app.use(bodyParser.json()); 

  app.get('/webhooks/answer', (req, res) => {
    const ncco = [{
        action: 'talk',
        text: 'Welcome to My Test IVR. Please Press 1 for Listening to music, Press 2 for Hearing current time and date, Press 3 for customer support, followed by the hash key.',
        bargeIn: true,
      },
      {
        action: 'input',
        maxDigits: 5,
        timeOut: 15,
        eventUrl: [`${req.protocol}://${req.get('host')}/webhooks/dtmf`],
        submitOnHash: true
      }
    ] 
    res.json(ncco)
  })
  
app.post('/webhooks/dtmf', (req, res) => { 
  const dtmf = req.body.dtmf
  var ncco;
  let date_ob = new Date();
  switch(dtmf){
    case '1' :
      ncco = [{
        action: "stream",
        streamUrl: ["https://nexmo-community.github.io/ncco-examples/assets/voice_api_audio_streaming.mp3"]
      },
      {
        action: 'input',
        eventUrl: [`${req.protocol}://${req.get('host')}/webhooks/dtmf`],
        submitOnHash: true
      }] 
      break;
    case '2' :
      ncco = [{
        action: 'talk',
        text: `Current Time is ${date_ob.toTimeString()}.Today is ${date_ob.toDateString()}`
      }] 
      break;
    case '3' :
      ncco = [{
        action: 'talk',
        text: 'we are now connecting you to an agent who will be able to help you.'
        },
        {
            action: 'connect',
            from: process.env.VIRTUAL_NUMBER,
            musicOnHoldUrl: "https://nexmo-community.github.io/ncco-examples/assets/voice_api_audio_streaming.mp3",
            endpoint: 
            [
                {
                  "type": "phone",
                  "number": process.env.TO_NUMBER
                }
            ]

        }] 
      break;
  } 
  res.json(ncco); 
})
app.post('/webhooks/events', (req, res) => {
    res.sendStatus(200);
  })

const server = app.listen(3000, () => {
    console.log(`Server running on port ${server.address().port}`);
});

