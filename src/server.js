const {json_handler,response_handler} = require('./middleware.js')
const express = require('express');
const https = require("node:https");
const app = express();
const port = 8080;

app.use(response_handler)
app.use(json_handler)
//homepage endpoint
app.get('/', (req, res) => {
  res.send('this is the root for this server')
});
//request endpoint
app.get('/request',(req,res) => {
    https.get("https://example.com/", (req_response) => {
      //set request headers
      res.set(req_response.headers);
      //send data once request is intercepted and processed by the middleware
      req_response.on('data', (d) => {
        res.send(d);
      });
      //send error if one occurs
    }).on('error', (e) => {
      res.send(e);
    });
   
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
