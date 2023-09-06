const router = require('express').Router()

const { tokenExtractor } = require('../middleware/tokenExtractor');

const { Session } = require('../models/index');

router.delete('/', tokenExtractor, async (req, res) => {
  console.log('DEC TOKEN:', req.decodedToken);

  await Session.destroy({
    where: {
      id: req.decodedToken.sessionId
    }
  })

  res.status(204).send();
})

module.exports = router