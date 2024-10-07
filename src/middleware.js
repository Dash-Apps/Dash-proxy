const { response, json } = require("express");
const {parse} = require("node-html-parser");

//request interception and handling 
function response_handler(req,res,next){
    //original intact send func
    const og_write = res.write;
    //func override for reponse body modification
    res.write = function(body){
        // appends dummy text to the end of
        const response_body = body;
        og_write.call(this,response_body)
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
