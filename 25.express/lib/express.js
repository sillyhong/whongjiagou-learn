const http = require('http');
const url = require('url');
const Router = require('./router');
const Application = require('./application');
function createApplicaton() {
    return new Application();
}
createApplicaton.Router = Router;
module.exports = createApplicaton;