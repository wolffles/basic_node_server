const express = require('express')
const app = express();
const hash = require('hash.js')

const content = "hello"

var getID = function(content) {
    let type = "text"
    let new_content = ""
    switch (type) {
        case "text":
            if (content === "") {
                throw new Error("Failed getting ID: Datasource requires content for ID generation");
            }
            new_content = content;
    }
    return new_content
}
var blah = getID(content)

app.get('/', (req, res) => {
    res.send(blah)
    console.log(blah)
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
});