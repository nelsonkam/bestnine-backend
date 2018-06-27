var express = require('express');
var router = express.Router();
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY,
});
/* GET home page. */
router.get('/bestnine/:username', function(req, res, next) {
  const username = req.params["username"]
  unsplash.users.photos(username, 1, 9, "popular")
    .then(toJson)
    .then((json) => {
      if (json.errors) {
        throw new Error(json.errors.join("\n"))
      }
      res.json({
        user: json[0].user,
        images: json.map(image => image.urls.small)
      })
    }).catch((err) => {
      res.status(err.status || 500).json({
        message: err.message,
        error: err
      });
    })
});

module.exports = router;
