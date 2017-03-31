/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');

/* INDEX ROUTE
----------------------------------------- */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/', function(req, res) {
  const name = req.body.username;
  const pw = passwordHash.generate(req.body.password);
  console.log(pw);
  console.log(passwordHash.verify('power112', pw)); //
  const dataToSave = { username: name, password: pw };
  db.collection('users').save(dataToSave, (err, result) => {
   if (err) return console.log(err);
   console.log('saved to database')
   res.render('index');
 });
});



/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
