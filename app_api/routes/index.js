const express = require("express");
const router = express.Router();
const ctrlLocation = require("../controllers/locations");
const ctrlReviews = require("../controllers/reviews");

// locations
router
  .route("/locations")
  .get(ctrlLocation.locationsListByDistance)
  .post(ctrlLocation.locationsCreate);
router
  .route("/locations/:locationid")
  .get(ctrlLocation.locationsReadOne)
  .put(ctrlLocation.locationsUpdateOne)
  .delete(ctrlLocation.locationsDeleteOne);

// reviews
router.route("/locations/:locationid/reviews").post(ctrlReviews.reviewsCreate);
router
  .route("/locations/:locationid/reviews/:reviewid")
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
