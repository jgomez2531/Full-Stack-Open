const router = require('express').Router();

const { tokenExtractor } = require('../middleware/tokenExtractor');

const { Readinglist } = require('../models');



router.get('/', async (req, res) => {
  const readinglists = await Readinglist.findAll({
  });
  console.log(JSON.stringify(readinglists, null, 2))
  res.json(readinglists);
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const readinglist = await Readinglist.create(req.body);
    return res.json(readinglist);
  } catch (e) {
    next(e);
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const reading = await Readinglist.findByPk(req.params.id);
  console.log('READING:', reading);

  if (reading) {
    if (reading.userId !== req.decodedToken.id) {
      return res.status(401).json({ error: 'Only one\'s own reading lists can be marked read!' });
    }

    try {
      reading.read = req.body.read;
      await reading.save();
      res.json(reading);
    } catch (e) {
      next(e);
    }
  } else {
    res.status(204).end();
  }
})

module.exports = router;
