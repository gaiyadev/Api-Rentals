var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('this is my api cpirse');
});

router.get('/api/movies', function (req, res, next) {
  res.send('this is my api cpirse');
});

module.exports = router;
