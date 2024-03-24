const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bdparser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;


app.use(cors());
app.use(bdparser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query('SELECT * FROM users');
        conn.end();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query('SELECT * FROM users WHERE u_id = ?', [req.params.id]);
        conn.end();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

app.post('/users', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query('INSERT INTO users SET username = ?, description = ?', [req.body.username, req.body.description]);
        conn.end();
        res.json({ 
            "message" : 'Post data success!',
            "id" : data.insertId,
            "data" : req.body 
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query('UPDATE users SET username = ?, description = ? WHERE u_id = ?', [req.body.username, req.body.description, req.params.id]);
        conn.end();
        res.json({ 
            "message" : 'Put data success!',
            "id" : req.params.id,
            "data" : req.body 
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query('DELETE FROM users WHERE u_id = ?', [req.params.id]);
        conn.end();
        res.json({ 
            "message" : 'Delete data success!',
            "id" : req.params.id
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});