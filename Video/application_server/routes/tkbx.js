var express = require('express');
var router = express.Router();
var OpenTok = require('opentok');

var sessionId;


/* STEP 1

Require TB client and initalize it

*/
var openTok = new OpenTok('46765332','46a0a631f0fb59eb057d3f381afbde5bf9f17b18');
const createSession = onSessionCreated => {
  /* STEP 2

  Generate session and update the property sessionId. Then call 'onSessionCreated()' method.
        "...sessionId = 123453;"
        "...onSessionCreated();"

  */
 openTok.createSession(function(err, session) {
  if (err) return console.log(err);
  sessionId = session.sessionId;
});
};

router.post('/session/', function(req, res, next) {
  var onSessionCreated = () => {
    res.json({ sessionId: sessionId });
  };

  if (!sessionId) {
    createSession(onSessionCreated);
  } else {
    onSessionCreated();
  }
});

router.post('/user/', function(req, res, next) {
  /* STEP 3

  Create oken and return to client
        
  */ 

  const token = openTok.generateToken(sessionId);
  res.json({ token });
});

module.exports = router;
