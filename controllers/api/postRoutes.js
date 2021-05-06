const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      creator_id: req.session.user_id,
    });
    console.log(newPost)
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        creator_id: req.session.user_id,
      },
    });
    if(!postData) {
      res.status(404).json({ message: 'No post found with this id!'});
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;