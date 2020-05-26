# NodeJS Project

> Certification Project for Vonage Dispatch using NodeJS and Express 

## Usage

Install dependencies by going to root folder in cmd.

```
1) npm install
```

Update the .env file. Insert values for NEXMO_API_KEY, NEXMO_API_SECRET,APP_ID,VIRTUAL_NUMBER, TO_NUMBER, MSG_FROM (facebook sender id) & MSG_TO (facebook receiver id).

Copy your Vonage private.key to root folder

## To run server (from the root of the project)

```
node index.js
```

Run ngrok application. Listen to port 3000
```
ngrok http 3000
```

Update the webhook url in your application.
```
Inbound POST https://e5a56cf7.ngrok.io/webhooks/Inbound 
Status GET https://e5a56cf7.ngrok.io/webhooks/Status
```

## To run server (from the root of the project)

```
node sendsms.js
```
