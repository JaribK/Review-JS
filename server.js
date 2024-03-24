const express = require('express');
const bdparser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(bdparser.json());

// step 3 create routes for CRUD operation (API).

const usersCRUD = require('./routes/users.js');

app.use('/users', usersCRUD);

////////////////////////////////////////////////////////

// first page.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});