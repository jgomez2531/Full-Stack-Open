const router = require('express').Router();
const { Op } = require('sequelize');

const { tokenExtractor } = require('../middleware/tokenExtractor');

const { Blog, User, Session } = require('../models');


const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
}


router.get('/', async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search
          }
        },
        {
          author: {
            [Op.substring]: req.query.search
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  });
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs);
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    try {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    }
    catch (e) {
      next(e);
    }
  } else {
    res.status(204).end()
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const session = await Session.findByPk(req.decodedToken.sessionId);
    if (!session) {
      return res.status(401).json({ error: 'Session has expired!' });
    }

    const blog = await Blog.create({
      ...req.body, userId: user.id, date: new Date()
    });
    return res.json(blog);
  } catch (e) {
    next(e);
  }
})

router.delete('/:id', [tokenExtractor, blogFinder], async (req, res) => {
  if (req.blog) {
    const session = await Session.findByPk(req.decodedToken.sessionId);
    if (!session) {
      return res.status(401).json({ error: 'Session has expired!' });
    }

    if (req.blog.userId !== req.decodedToken.id) {
      return res.status(401).json({ error: 'Only one\'s own posts can be deleted!' });
    }
    await req.blog.destroy();
  }
  res.status(204).end()
})

module.exports = router;
