const express = require('express');

// Método que devuelve un objeto en el cual yo puedo ingresar rutas
const router = express.Router();

const Word = require('../models/word');

router.get('/', async (req, res) => {
    const words = await Word.find();
    console.log(words);
    res.json(words);
});

router.get('/:id', async (req, res) => {
    const word = await Word.findById(req.params.id);
    res.json(word);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { spanish, costanish, description } = req.body;
    const newWord = new Word({spanish, costanish, description});
    await newWord.save();
    console.log(newWord);
    res.json({'status': 'Palabra guardada'})
});

router.put('/:id', async (req, res) => {
    const { spanish, costanish, description } = req.body;
    const word = { spanish, costanish, description };

    await Word.findByIdAndUpdate(req.params.id, word);
    console.log(word);
    res.json({status: 'Palabra actualizada'});
});

router.delete('/:id', async (req, res) => {
    await Word.findByIdAndRemove(req.params.id);
    res.json({status: 'Palabra borrada'});
});

module.exports = router;
