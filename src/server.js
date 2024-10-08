const {json_handler,response_handler} = require('./middleware.js')
const express = require('express');
const https = require("node:https");
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors())
app.use(response_handler)

//homepage endpoint
app.get('/', (req, res) => {
  res.sendFile('/workspaces/Dash-proxy/src/index.html')
});
//request endpoint
app.get('/request',(req,res) => {
    const queries = req.query;
    https.get(queries["url"], (req_response) => {

    //send data once request is intercepted and processed by the middleware
    req_response.on('data', (d) => {
    if (res.headersSent){
          res.write(d)
    }else{
          res.set(req_response.headers)
          res.write(d)
        }
      });
      //send error if one occurs
    });
   
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
