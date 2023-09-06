const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config');
const { User, Session } = require('../models/index');

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  console.log('USER:', user);

  const passwordCorrect = body.password === 'secret'
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'user has been disabled'
    })
  }

  const session = await Session.create({ userId: user.id });
  console.log('SESSION:', session);

  const userForToken = {
    username: user.username,
    id: user.id,
    sessionId: session.id
  }

  const token = jwt.sign(userForToken, SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router