const {json_handler,response_handler} = require('./middleware.js')
const express = require('express');
const https = require("node:https");
const app = express();
const port = 3000;

app.use(response_handler)
app.use(json_handler)
//homepage endpoint
app.get('/', (req, res) => {
  res.send('this is the root for this server')
});
//debugging endpoint

app.get('/request/:URL',(req,res) => {
    url = req.params
    res.send(url[URL])
    https.get(url, (req_response) => {

      console.log('statusCode:', req_response.statusCode);
      console.log('headers:', req_response.headers);
    
      req_response.on('data', (d) => {
        res.send(d)
      });
    
    }).on('error', (e) => {
      console.error(e);
    });
    res.send()    
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
