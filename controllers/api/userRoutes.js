const router = require('express').Router();
const { User } = require('../../models');


// signup

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.status(200).json(userData);
      console.log(userData);
    });

  } catch (err) {
    console.log(req.body);
    console.log(err)
    res.status(400).json(err);
  }
});


router.post('/login', async (req, res) => {
  try{
    const userData = await User.findOne({where: { username: req.body.username}});
    if (!userData)  {
      res.status(400).json({message: 'incorrect username or email'})
      return;
    }
    // const validPassword = await userData.checkPassword(req.body.password);

    // if (!validPassword) {
    //   res.status(400).json({message: 'invalid password'});
    //   return;
    // }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'you are now logged in'});
    });
  }
  catch(err) {
    res.status(500).json(err);
    console.log(err);
  }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;