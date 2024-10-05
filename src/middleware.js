const {parse} = require("node-html-parser");

//request interception and handling 
function response_handler(req,res,next){
    //original intact send func
    const og_send = res.send;

    //func override for reponse body modification
    res.send = function(body){
        const response_body = body 
        og_send.call(this,response_body)
        };
    next();
    }

function json_handler(req,res,next){
    //original intact json function
    const og_json = res.json;

    res.json = function(body) {
        const json_response_body = {...body}
        og_json.call(this,json_response_body)
    }
    next();
}

exports.json_handler = json_handler;
exports.response_handler = response_handler
