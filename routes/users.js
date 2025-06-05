const exepress = require('express');

const router = exepress.Router();


router.get('/', (req, res) => {
    res.json({message: "Hello World"})
});

module.exports = router