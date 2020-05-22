# NodeJS Project

> Certification Project for Vonage Voice using NodeJS and Express 

## Usage

Install dependencies by going to root folder in cmd.

```
1) npm install
```

Update the .env file. Insert values for NEXMO_API_KEY, NEXMO_API_SECRET,BRAND_NAME,VIRTUAL_NUMBER & TO_NUMBER.

Copy your Vonage private.key to root folder

## To run project (from the root of the project)

```
node index.js
```

Run ngrok application. Listen to port 3000
```
ngrok http 3000
```

Update the webhook url in your voice application.
```
Event POST https://e5a56cf7.ngrok.io/webhooks/events
Answer GET https://e5a56cf7.ngrok.io/webhooks/answer
Fallback POST https://e5a56cf7.ngrok.io/webhooks/events
```


## After starting the application
1) Call VIRTUAL_NUMBER
2) Press 1 followed by hash key to hear audio file
3) Press 2 followed by hash key to hear current time and date
4) Press 3 followed by hash key to transferred to the To_Number with a “we are now connecting you to an agent who will be able to help you” message
