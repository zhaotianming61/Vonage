# NodeJS Project

> Certification Project for Vonage Verify & SMS using NodeJS and Express 

## Usage

Install dependencies by going to root folder in cmd.

```
1) npm install
```

Update the .env file. Insert values for NEXMO_API_KEY, NEXMO_API_SECRET,BRAND_NAME & VIRTUAL_NUMBER.

Copy your Vonage private.key to root folder

## To run project (from the root of the project)

```
node server.js
```

Run ngrok application. Listen to port 3000
```
ngrok http 3000
```

Update the webhook url in your account settings under "inbound messages" and Change to POST method.
```
https://e5a56cf7.ngrok.io/webhooks/inbound-sms
```


## After starting the application
1) Click 'Regist' button
2) Enter your name and phone number and Click 'Get Verify Code' button
3) Enter the code that was sent to your phone number and Click 'Verify me' button
4) it will redirect you to Welcome page with your name if verify successfully.
5) You can now key in a valid phone numbers and Click 'Start Private SMS' button to establish a private chat.



