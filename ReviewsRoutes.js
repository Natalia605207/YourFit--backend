const { Router } = require("express");
const { getReviews, saveReviews } = require('./ReviewsController');
const router = Router();

router.get('/', getReviews);
router.post('/saveReviews', saveReviews);


module.exports = router;