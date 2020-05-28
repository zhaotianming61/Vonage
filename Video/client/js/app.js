// replace this values with the one generated in your TokBox Account
const apiKey = '46765332';
const appServerUrl = 'http://localhost:3000/tkbx';

let sessionId ='2_MX40Njc2NTMzMn5-MTU5MDY1MDI4MzI2Mn5iTm0wcmsrTTVDYmFNeWNVRmNUOUt3Q2x-fg';
let token ='T1==cGFydG5lcl9pZD00Njc2NTMzMiZzaWc9MzZjMzVmMjQ3NzVmZDJkYTZkODc1NGNhNTJjNDFiY2I1MWRmYjk0MjpzZXNzaW9uX2lkPTJfTVg0ME5qYzJOVE16TW41LU1UVTVNRFkxTURJNE16STJNbjVpVG0wd2Ntc3JUVFZEWW1GTmVXTlZSbU5VT1V0M1EyeC1mZyZjcmVhdGVfdGltZT0xNTkwNjUwMzA4Jm5vbmNlPTAuNzgwODc4MTM2Mjc3OTM0OSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTkwNjcxOTA3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

// 1. Create session
createSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// 1.1 After create session, call getToken(sessionId)
function createSession() { 
  const url = "https://e4df9df4358a.ngrok.io/tkbx/session";
  $.post(url,{},function(data, status){ 
    if(status === 'success') {
      getToken(data.sessionId);
    } 
  });
}

// 2. After getToken, call initializeSession() and continue according to the tutorial
function getToken(sessionId) {
  sessionId = sessionId;
  const url = "https://e4df9df4358a.ngrok.io/tkbx/user";
  $.post(url,{},function(data, status){ 
    if(status === 'success') {
      console.log(data);
      token = data.token;
      initializeSession();
    } 
  });
}

// 3. Complete according to the tutorial
initializeSession();
function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });
  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}