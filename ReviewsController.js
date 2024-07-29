const ReviewsModel = require('./ReviewsModel');

module.exports.getReviews = async (req, res) => {
    const Reviews = await ReviewsModel.find();
    res.send(Reviews)
}

module.exports.saveReviews = async (req, res) => {
    const newReview = {
        name: req.body.name,
        comment: req.body.comment
    }
    ReviewsModel.create(newReview)
    .then((data) => {
        console.log("Review added");
        res.send(data);
    } )
    .catch((error) => {
            console.log(error);
            res.status(500).send("Failed to save review");
        });
}