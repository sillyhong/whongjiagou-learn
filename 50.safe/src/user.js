const express = require('express');
const path = require('path');
let app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.listen(8080);