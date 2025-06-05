const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const authMiddleware = require('../middlewares/auth'); 


router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
    }

    try {
        const note = await Note.create({
            title,
            description,
            author: req.user.id  
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate('author', 'name email');

        if (!note) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }

        if (note.author._id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ author: req.user.id }).populate('author', 'name email');
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
    }

    try {
        const note = await Note.findById(req.params.id).populate('author');

        if (!note) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }

        if (!note.author || note.author._id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        note.title = title;
        note.description = description;

        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a nota' });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate('author');

        if (!note) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }

        if (!note.author || note.author._id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        await note.deleteOne(); 
        res.status(200).json({ message: 'Nota excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir a nota' });
    }
});


module.exports = router;
