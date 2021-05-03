const { Post, User } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    //get all posts and include creator
    const postData = await Post.findAll({
      include: [
        {
          model: User, 
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true}));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
    console.log(posts)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  try {
    res.render('login')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        creator_id: req.session.user_id
      }
    });
    const posts = postData.map((post) => post.get({ plain: true}));
    res.render('dashboard', {
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', withAuth, (req, res) => {
  try {
    res.render('newpost');
  }
  catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});


router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const post = postData.get({ plain: true});

    res.render('viewpost', {
      ...post,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;