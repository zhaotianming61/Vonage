const Nexmo = require("nexmo"); 
const config = require('./config'); 
const nexmo = new Nexmo({
    apiKey: config.NEXMO_API_KEY,
    apiSecret: config.NEXMO_API_SECRET,
    applicationId: config.APP_ID,
    privateKey: config.PRIVATE_KEY
  }); 
  nexmo.dispatch.create(
    "failover",
    [
      {
        from: { type: "sms", number: config.VIRTUAL_NUMBER },
        to: { type: "sms", number: config.To_NUMBER },
        message: {
          content: {
            type: "text",
            text: "Dear customer, your package will be delivered tomorrow."
          }
        },
        failover: {
          expiry_time: 180,
          condition_status: "read"
        }
      },
      // {
      //   from: { type: "whatsapp", number: config.VIRTUAL_NUMBER },
      //   to: { type: "whatsapp", number: config.To_NUMBER },
      //   message: {
      //     content: {
      //       type: "text",
      //       text: "2nd sms"
      //     }
      //   }
      // }
      {
        from: { type: "messenger", id: config.MSG_FROM },
        to: { type: "messenger", id: config.MSG_TO },
        message: {
          content: {
            type: "image",
            image: {
              url: "https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/vanity-url-definition-misunderstanding.png?wndDB0it04FZA3M9e0q0c5NLo4u5tBs6&itok=s359okjP"
            }
          }
        }
      }
    ],
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data.dispatch_uuid);
      }
    }
  );