//step 2 create crud operation foreach table.
const express = require('express');
const router = express.Router();
const datas = require('../database');

router.get('/', async (req, res) => {
    try {
        const [data] = await datas.query('SELECT * FROM users');
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [data] = await datas.query('SELECT * FROM users WHERE u_id = ?', [req.params.id]);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const [data] = await datas.query('INSERT INTO users SET username = ?, description = ?', [req.body.username, req.body.description]);
        res.json({ 
            "message" : 'Post data success!',
            "id" : data.insertId,
            "data" : req.body 
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [data] = await datas.query('UPDATE users SET username = ?, description = ? WHERE u_id = ?', [req.body.username, req.body.description, req.params.id]);
        res.json({ 
            "message" : 'Put data success!',
            "id" : req.params.id,
            "data" : req.body 
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [data] = await datas.query('DELETE FROM users WHERE u_id = ?', [req.params.id]);
        res.json({ 
            "message" : 'Delete data success!',
            "id" : req.params.id
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;