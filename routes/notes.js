const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const authMiddleware = require('../middlewares/auth'); 

// Proteger a rota com o middleware
router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
    }

    try {
        const note = await Note.create({
            title,
            description,
            author: req.user.id  // <- agora funciona!
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
