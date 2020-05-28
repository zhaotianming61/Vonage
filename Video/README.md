# NodeJS Project

> Certification Project for Vonage Video using NodeJS and Express 

# For Server side, launch application_server application 
## Usage

Install dependencies by going to root folder in cmd.

```
1) npm install
```

Update API_key and secret in tkbx.js in new OpenTok('','').

## To run project (from the root of the project)

```
node index.js
```

Run ngrok application. Listen to port 3000
```
ngrok http 3000
```

Update the callback event url in your video application.
```
POST https://e5a56cf7.ngrok.io/routes/events 
```


# For Client side, launch client application.

## Usage

Install dependencies by going to root folder in cmd.

```
1) npm install
```

Update apiKey, appServerUrl, sessionId, token, url in createSession and url in getToken.

## To run project (from the root of the project)

Open index.html in google chrome browser.
